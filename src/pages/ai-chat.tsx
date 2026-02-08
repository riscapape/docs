import React, { useState, useRef, useEffect } from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import clsx from "clsx";

import styles from "./ai-chat.module.css";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type MessageRole = "user" | "assistant";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  references?: { title: string; url: string }[];
  isError?: boolean;
}

interface KnowledgeQueryResponse {
  answer: string;
  references: { title: string; url: string }[];
  model?: string;
  confidence?: number;
}

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const KNOWLEDGE_DOMAINS = ["docs:whitepaper"] as const;

const SUGGESTIONS = [
  "What is the P2P Protocol?",
  "How does proof of credibility work?",
  "Explain the privacy model.",
];

const INITIAL_MESSAGE: Message = {
  id: "init-1",
  role: "assistant",
  content:
    "Hi there! 👋\n\nI'm the P2P Protocol AI Assistant. I can help you understand our whitepaper and explain technical concepts.\n\nHow can I help you today?",
};

// -----------------------------------------------------------------------------
// Components
// -----------------------------------------------------------------------------

const Avatar = ({ role }: { role: MessageRole }) => {
  return (
    <div className={clsx(styles.avatar, role === "user" ? styles.avatarUser : styles.avatarAssistant)}>
      {role === "user" ? "👤" : "🤖"}
    </div>
  );
};

const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === "user";

  return (
    <div className={clsx(styles.messageRow, isUser ? styles.messageRowUser : styles.messageRowAssistant)}>
      <Avatar role={message.role} />
      <div className={styles.messageContent}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
        
        {message.references && message.references.length > 0 && (
          <div className={styles.references}>
            <span className={styles.referencesLabel}>Sources</span>
            <ul className={styles.referencesList}>
              {message.references.map((ref, i) => (
                <li key={i}>
                  <a href={ref.url} target="_blank" rel="noopener noreferrer" className={styles.refLink}>
                    {ref.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const TypingIndicator = () => (
  <div className={styles.messageRow}>
    <Avatar role="assistant" />
    <div className={clsx(styles.messageContent, styles.typingWrapper)}>
      <div className={styles.typingIndicator}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
);

// -----------------------------------------------------------------------------
// Main Page Component
// -----------------------------------------------------------------------------

export default function AIChatPage(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const apiBaseUrl = (siteConfig.customFields?.knowledgeApiUrl as string) || "http://localhost:3001";
  
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    // Reset UI state
    setError(null);
    setInput("");
    
    // Add User Message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch(`${apiBaseUrl}/knowledge/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: trimmed,
          domains: KNOWLEDGE_DOMAINS,
          app_context: "docs-site",
          audience: "public",
        }),
      });

      if (!res.ok) {
        throw new Error(`Service unavailable (${res.status})`);
      }

      const data: KnowledgeQueryResponse = await res.json();
      
      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.answer,
        references: data.references,
      };
      
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (e) {
      console.error(e);
      const errMsg = e instanceof Error ? e.message : "Unknown error";
      setError(errMsg);
      
      const errorMsg: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: `I'm having trouble connecting to the knowledge base right now. Please check if the API is running.\n\nError: \`${errMsg}\``,
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
      // Keep focus on input for rapid chatting
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <Layout
      title="AI Support"
      description="Get instant answers about the P2P Protocol"
      noFooter
    >
      <main className={styles.chatPage}>
        <div className={styles.chatHeader}>
          <h1 className={styles.chatTitle}>AI Support Agent</h1>
          <p className={styles.chatSubtitle}>Powered by P2P Knowledge Base</p>
        </div>

        <div className={styles.chatContainer}>
          <div className={styles.messages}>
            {/* Messages List */}
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            
            {/* Loading State */}
            {loading && <TypingIndicator />}
            
            {/* Empty State / Suggestions (only if just welcome message is there) */}
            {messages.length === 1 && !loading && (
              <div className={styles.suggestionsGrid}>
                {SUGGESTIONS.map((suggestion, idx) => (
                  <button
                    key={idx}
                    className={styles.suggestionChip}
                    onClick={() => handleSendMessage(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className={styles.inputArea}>
             {error && (
                <div className={styles.errorBanner}>
                  <span>⚠️</span> {error}
                </div>
              )}
            <form onSubmit={handleSubmit} className={styles.inputForm}>
              <textarea
                ref={inputRef}
                className={styles.input}
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                disabled={loading}
              />
              <button
                type="submit"
                className={styles.sendButton}
                disabled={loading || !input.trim()}
                title="Send Message"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
}

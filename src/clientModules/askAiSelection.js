/**
 * Ask AI on Text Selection
 *
 * Shows a floating "Ask AI" tooltip when the user selects text in the docs.
 * Clicking the tooltip opens the Biel.ai chat widget and auto-sends the
 * selected text as a question.
 *
 * The Biel widget (biel-search web component) listens for a custom event
 * called "bielBotButtonClick" to toggle its chat panel. Once open, we
 * find the textarea and send button within the DOM to auto-fill and submit.
 */
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  /* ── Tooltip element ────────────────────────────────────────────── */
  const tooltip = document.createElement('div');
  tooltip.id = 'ask-ai-tooltip';
  tooltip.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round"
         stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
    <span>Ask AI</span>
  `;
  tooltip.style.display = 'none';
  document.body.appendChild(tooltip);

  let storedText = '';

  /* ── Position the tooltip near the selection ────────────────────── */
  const showTooltip = () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    if (!text || text.length < 2) {
      hideTooltip();
      return;
    }
    storedText = text;
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const tooltipWidth = 110;
    let left = rect.left + (rect.width / 2) - (tooltipWidth / 2) + window.scrollX;
    let top = rect.top - 44 + window.scrollY;
    left = Math.max(8, Math.min(left, window.innerWidth - tooltipWidth - 8));
    if (top < window.scrollY + 8) {
      top = rect.bottom + 8 + window.scrollY;
    }
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    tooltip.style.display = 'flex';
  };

  const hideTooltip = () => {
    tooltip.style.display = 'none';
  };

  /* ── Deep querySelector across Shadow DOM ───────────────────────── */
  const deepQuery = (selector, root = document) => {
    const found = root.querySelector(selector);
    if (found) return found;
    const els = root.querySelectorAll('*');
    for (const el of els) {
      if (el.shadowRoot) {
        const result = deepQuery(selector, el.shadowRoot);
        if (result) return result;
      }
    }
    return null;
  };

  /* ── Open Biel and auto-send the query ──────────────────────────── */
  const openBielWithQuery = (query) => {
    // Step 1: Open the Biel chat panel using the custom event it listens for
    // The biel-search component listens for "bielBotButtonClick" to toggle
    const bielBtn = document.querySelector('biel-button');

    if (bielBtn) {
      // Dispatch the custom event that the Biel component listens for
      bielBtn.dispatchEvent(new CustomEvent('bielBotButtonClick', {
        bubbles: true, composed: true,
      }));

      // Also try setting showModal directly on biel-bot if found
      const bielBot = deepQuery('biel-bot');
      if (bielBot) {
        bielBot.showModal = true;
        bielBot.setAttribute('show-modal', 'true');
      }

      // Also try via the shadow root button click as fallback
      if (bielBtn.shadowRoot) {
        const innerBtn = bielBtn.shadowRoot.querySelector('button');
        if (innerBtn) innerBtn.click();
      }
    }

    // Step 2: Poll for textarea and auto-fill + send
    let attempts = 0;
    const pollAndFill = () => {
      attempts++;

      const textarea = document.querySelector('textarea.biel-input__textarea')
                    || document.querySelector('textarea[placeholder*="message"]')
                    || document.querySelector('.biel-input__textarea')
                    || deepQuery('textarea.biel-input__textarea')
                    || deepQuery('textarea[placeholder*="message"]')
                    || deepQuery('textarea');

      if (textarea) {
        textarea.focus();

        // Use native setter to bypass framework bindings
        const nativeSetter = Object.getOwnPropertyDescriptor(
          HTMLTextAreaElement.prototype, 'value'
        )?.set;
        if (nativeSetter) {
          nativeSetter.call(textarea, query);
        } else {
          textarea.value = query;
        }

        // Fire input events
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        textarea.dispatchEvent(new Event('change', { bubbles: true }));
        textarea.dispatchEvent(new InputEvent('input', {
          bubbles: true, inputType: 'insertText', data: query,
        }));

        // Step 3: Click send or press Enter
        setTimeout(() => {
          const sendBtn = document.querySelector('button.biel-input__button')
                       || document.querySelector('.biel-input__button')
                       || deepQuery('button.biel-input__button')
                       || deepQuery('.biel-input__button');

          if (sendBtn) {
            sendBtn.click();
          } else {
            // Dispatch messageSent custom event as used internally
            const enterOpts = {
              key: 'Enter', code: 'Enter', keyCode: 13, which: 13,
              bubbles: true, cancelable: true,
            };
            textarea.dispatchEvent(new KeyboardEvent('keydown', enterOpts));
            textarea.dispatchEvent(new KeyboardEvent('keypress', enterOpts));
            textarea.dispatchEvent(new KeyboardEvent('keyup', enterOpts));
          }
        }, 400);
      } else if (attempts < 40) {
        setTimeout(pollAndFill, 200);
      }
    };

    setTimeout(pollAndFill, 600);
  };

  /* ── Event listeners ────────────────────────────────────────────── */
  document.addEventListener('mouseup', (e) => {
    if (tooltip.contains(e.target)) return;
    const docContent = e.target.closest('.markdown, .theme-doc-markdown, article');
    if (!docContent) {
      hideTooltip();
      return;
    }
    setTimeout(showTooltip, 10);
  });

  // Prevent mousedown on tooltip from clearing text selection
  tooltip.addEventListener('mousedown', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });

  tooltip.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const query = storedText;
    if (query) {
      hideTooltip();
      window.getSelection()?.removeAllRanges();
      openBielWithQuery(query);
      storedText = '';
    }
  });

  document.addEventListener('mousedown', (e) => {
    if (!tooltip.contains(e.target)) {
      hideTooltip();
    }
  });

  let scrollTimer;
  window.addEventListener('scroll', () => {
    if (tooltip.style.display !== 'none') {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(hideTooltip, 150);
    }
  }, { passive: true });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideTooltip();
  });
}

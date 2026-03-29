import React from 'react';
import styles from './LegalLink.module.css';

export default function LegalLink() {
  return (
    <a
      href="https://docsend.com/view/s/nyrupstkhcpu94wc"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.legalLink}>
      Legal Documents
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.legalLinkIcon}>
        <path
          d="M3.5 10.5L10.5 3.5M10.5 3.5H5M10.5 3.5V9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

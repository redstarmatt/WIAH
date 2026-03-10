'use client';

import { useState } from 'react';

interface ShareButtonProps {
  title?: string;
  text?: string;
}

export default function ShareButton({ title, text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // User cancelled or share failed — do nothing
      }
      return;
    }

    // Fallback: copy URL to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard not available
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1.5 text-sm text-wiah-mid hover:text-wiah-blue transition-colors whitespace-nowrap"
      aria-label="Share this page"
    >
      {copied ? (
        <>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7l3.5 3.5L12 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-mono text-xs">Copied</span>
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M10 1a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM4 5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" stroke="currentColor" strokeWidth="1.2" />
            <path d="M5.8 6.3l2.4-1.6M5.8 7.7l2.4 1.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className="font-mono text-xs">Share</span>
        </>
      )}
    </button>
  );
}

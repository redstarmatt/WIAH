'use client';

import { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/maqpyyzb', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p className="text-sm font-mono text-wiah-green border border-wiah-green/30 rounded px-4 py-3">
        Message sent — thank you. We&apos;ll get back to you if a correction is needed.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-mono text-wiah-mid mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full border border-wiah-border rounded px-3 py-2 text-sm text-wiah-black focus:outline-none focus:border-wiah-blue"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-mono text-wiah-mid mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full border border-wiah-border rounded px-3 py-2 text-sm text-wiah-black focus:outline-none focus:border-wiah-blue"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-mono text-wiah-mid mb-1">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          required
          className="w-full border border-wiah-border rounded px-3 py-2 text-sm text-wiah-black focus:outline-none focus:border-wiah-blue bg-white"
        >
          <option value="">Select a topic…</option>
          <option value="Data correction">Data correction</option>
          <option value="Missing data">Missing or outdated data</option>
          <option value="Methodology question">Methodology question</option>
          <option value="General feedback">General feedback</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-mono text-wiah-mid mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full border border-wiah-border rounded px-3 py-2 text-sm text-wiah-black focus:outline-none focus:border-wiah-blue resize-none"
          placeholder="If reporting a data error, please include the page, the figure, and a link to your source."
        />
      </div>
      {status === 'error' && (
        <p className="text-sm font-mono text-wiah-red">
          Something went wrong — please try again or email us directly.
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="px-5 py-2 bg-wiah-dark text-white text-sm font-mono rounded hover:bg-wiah-blue transition-colors disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}

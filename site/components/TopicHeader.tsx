import React from 'react';
import SiteName from './SiteName';

interface TopicHeaderProps {
  topic: string;
  question: string;
  finding: React.ReactNode;
  colour?: string;
  preposition?: string;
}

export default function TopicHeader({ topic, question, finding, colour, preposition }: TopicHeaderProps) {
  return (
    <header className="mb-12">
      <p className="mb-4" style={{ color: colour }}>
        <SiteName size="nav" topic={topic} preposition={preposition} />
      </p>
      <h1 className="text-4xl font-extrabold text-wiah-black leading-tight mb-4">
        {question}
      </h1>
      <p className="text-lg text-wiah-mid leading-relaxed max-w-2xl">
        {finding}
      </p>
    </header>
  );
}

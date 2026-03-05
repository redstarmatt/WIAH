import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creative Industries',
  description: 'The UK s creative industries contribute 116bn to GDP annually and employ 2.4 million people but the sector faces mounting pressures from AI-generated content th',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

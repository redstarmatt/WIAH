import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Youth Gambling Harm',
  description: 'An estimated 55,000 children aged 11-16 are classified as problem gamblers, with online gambling increasingly accessible.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Exclusion',
  description: '7.5 million adults in the UK lack basic digital skills, and as public services, banking, and healthcare move online, digital exclusion is becoming a fundamental',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Holiday Hunger',
  description: '2.5 million children are at risk of holiday hunger when free school meal provision ends at half-terms and holidays.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

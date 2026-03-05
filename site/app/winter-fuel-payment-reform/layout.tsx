import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Winter Fuel Payment',
  description: '10 million pensioners lost the Winter Fuel Payment in 2024 when the government means-tested it and projections suggest 200,000 more pensioners will fall into po',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

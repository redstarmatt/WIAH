import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Small Business',
  description: 'Company insolvencies in England and Wales reached 27,500 in 2024 the highest level in over 30 years. The five-year survival rate for new businesses has fallen t',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tax Evasion',
  description: 'HMRC estimates the UK tax gap at 39.8 billion per year the difference between the tax that should be paid under the law and the amount actually collected. This ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

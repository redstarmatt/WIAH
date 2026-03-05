import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Debt',
  description: 'UK households owe 1.9 trillion in total debt 130% of household income. 8.9 million people are in problem debt (StepChange). Personal insolvencies rose to 110,00',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

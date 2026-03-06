import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Court Interpreter Services',
  description: 'There were 10,200 interpreter booking failures in Crown and magistrates courts in 2023, causing delays to justice.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

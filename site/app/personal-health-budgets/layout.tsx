import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Health Budgets',
  description: 'Uptake of personal health budgets has grown but remains below NHS targets, with wide regional variation.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHS Agency Spend',
  description: 'The NHS spent 3.7 billion on agency and locum staff in 2023/24 enough to employ 55,000 additional nurses at full salary.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

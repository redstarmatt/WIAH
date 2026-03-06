import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Energy Efficiency',
  description: 'Only 49% of English homes have an EPC rating of C or above, against a target of 100% by 2035. Heat pump installations reached 72,000 in 2024 less than 12% of th',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

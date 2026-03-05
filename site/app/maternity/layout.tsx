import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Maternity Services',
  description: 'The UK maternal mortality rate stands at 9.7 per 100,000 births double the rate in Norway. Midwife vacancy rates reached 12.3% in 2023. The Ockenden Report foun',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

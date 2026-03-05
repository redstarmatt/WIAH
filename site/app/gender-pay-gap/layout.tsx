import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gender Pay Gap',
  description: 'The UK gender pay gap stands at 14.3% for full-time workers women earn 86p for every 1 earned by men. For all workers (including part-time), the gap rises to 19',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

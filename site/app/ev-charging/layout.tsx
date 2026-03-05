import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Infrastructure & Services',
  description: 'The UK now has 65,000 public charge points — growing fast. But EV registrations are outpacing infrastructure: there is 1 rapid charger for every 22 EVs, against',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

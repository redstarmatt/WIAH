import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Farm Subsidies',
  description: 'The Basic Payment Scheme which paid UK farmers £1.9bn annually based on land area is being phased out in favour of ELMs, which pays for environmental outcomes. ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

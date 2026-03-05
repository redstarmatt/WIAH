import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Traveller Site Provision',
  description: 'England has a shortfall of around 5,000 authorised Traveller pitches, and planning refusal rates for Traveller applications run double those for settled communi',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

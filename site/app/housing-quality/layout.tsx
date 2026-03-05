import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Housing Quality',
  description: '4.3 million homes in England do not meet the Decent Homes Standard. 1 million privately rented properties have Category 1 hazards (serious risk to health). The ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

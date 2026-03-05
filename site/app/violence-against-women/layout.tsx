import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Violence Against Women',
  description: 'Just 3.2% of reported rapes result in a charge and the average time from offence to court has stretched to almost two years.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

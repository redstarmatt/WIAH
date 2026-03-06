import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can the Grid Store Renewable Energy?',
  description: 'UK grid battery capacity has grown from near-zero to 4.2 GW — but needs to reach 50 GW by 2035 to manage renewable intermittency.',
  openGraph: {
    title: 'Can the Grid Store Renewable Energy?',
    description: 'UK grid battery capacity has grown from near-zero to 4.2 GW — but needs to reach 50 GW by 2035 to manage renewable intermittency.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/grid-battery-storage',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can the Grid Store Renewable Energy?',
    description: 'UK grid battery capacity has grown from near-zero to 4.2 GW — but needs to reach 50 GW by 2035 to manage renewable intermittency.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/grid-battery-storage',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

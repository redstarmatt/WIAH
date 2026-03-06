import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are British Airports Running Out of Capacity?',
  description: 'Heathrow operated at 97% of capacity in 2024, the highest utilisation of any major European hub, with no new runway decision taken.',
  openGraph: {
    title: 'Are British Airports Running Out of Capacity?',
    description: 'Heathrow operated at 97% of capacity in 2024, the highest utilisation of any major European hub, with no new runway decision taken.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/airport-capacity-utilisation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are British Airports Running Out of Capacity?',
    description: 'Heathrow operated at 97% of capacity in 2024, the highest utilisation of any major European hub, with no new runway decision taken.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/airport-capacity-utilisation',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

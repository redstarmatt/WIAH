import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many British Homes Cannot Afford to Stay Warm?',
  description: '13.4% of English households — 3.3 million homes — are in fuel poverty. The energy price cap reached £3,549/year in January 2023. Excess winter deaths attributable to cold homes average 9,700 per year. Fuel poverty is highest in the private rented sector, where 18.8% of households cannot afford to heat their homes.',
  openGraph: {
    title: 'How Many British Homes Cannot Afford to Stay Warm?',
    description: '13.4% of English households — 3.3 million homes — are in fuel poverty. The energy price cap reached £3,549/year in January 2023. Excess winter deaths attributable to cold homes average 9,700 per year. Fuel poverty is highest in the private rented sector, where 18.8% of households cannot afford to heat their homes.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/fuel-poverty',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many British Homes Cannot Afford to Stay Warm?',
    description: '13.4% of English households — 3.3 million homes — are in fuel poverty. The energy price cap reached £3,549/year in January 2023. Excess winter deaths attributable to cold homes average 9,700 per year. Fuel poverty is highest in the private rented sector, where 18.8% of households cannot afford to heat their homes.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/fuel-poverty',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

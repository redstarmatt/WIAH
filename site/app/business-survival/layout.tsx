import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `How Many Small Businesses Are Actually Making It?`,
  description: 'Only 44% of UK businesses survive five years. Post-pandemic closures spiked and start-up survival rates have fallen, with hospitality and retail faring worst.',
  openGraph: {
    title: `How Many Small Businesses Are Actually Making It?`,
    description: 'Only 44% of UK businesses survive five years. Post-pandemic closures spiked and start-up survival rates have fallen, with hospitality and retail faring worst.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/business-survival',
  },
  twitter: {
    card: 'summary_large_image',
    title: `How Many Small Businesses Are Actually Making It?`,
    description: 'Only 44% of UK businesses survive five years. Post-pandemic closures spiked and start-up survival rates have fallen, with hospitality and retail faring worst.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/business-survival',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

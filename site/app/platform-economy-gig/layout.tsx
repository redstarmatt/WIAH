import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `How Many People Work the Gig Economy — and What Does It Cost Them?`,
  description: '4.4 million UK workers are in the gig economy, up from 1.2 million in 2015. Most earn below minimum wage once costs are factored in, with limited sick pay entitlement despite the Uber Supreme Court ruling.',
  openGraph: {
    title: `How Many People Work the Gig Economy — and What Does It Cost Them?`,
    description: '4.4 million UK workers are in the gig economy, up from 1.2 million in 2015. Most earn below minimum wage once costs are factored in, with limited sick pay entitlement despite the Uber Supreme Court ruling.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/platform-economy-gig',
  },
  twitter: {
    card: 'summary_large_image',
    title: `How Many People Work the Gig Economy — and What Does It Cost Them?`,
    description: '4.4 million UK workers are in the gig economy, up from 1.2 million in 2015. Most earn below minimum wage once costs are factored in, with limited sick pay entitlement despite the Uber Supreme Court ruling.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/platform-economy-gig',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

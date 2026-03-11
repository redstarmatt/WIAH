import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Where Is Investment Actually Going?`,
  description: 'London receives £1,299 more per head in public investment than the North East. Despite levelling-up policies, the gap has widened since 2015, exacerbated by the cancellation of HS2 Phase 2.',
  openGraph: {
    title: `Where Is Investment Actually Going?`,
    description: 'London receives £1,299 more per head in public investment than the North East. Despite levelling-up policies, the gap has widened since 2015, exacerbated by the cancellation of HS2 Phase 2.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/regional-investment',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Where Is Investment Actually Going?`,
    description: 'London receives £1,299 more per head in public investment than the North East. Despite levelling-up policies, the gap has widened since 2015, exacerbated by the cancellation of HS2 Phase 2.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/regional-investment',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

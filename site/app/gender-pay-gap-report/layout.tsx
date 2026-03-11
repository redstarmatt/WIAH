import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Is the Gender Pay Gap Closing?`,
  description: 'The full-time gender pay gap is 7.7%, but the all-workers gap is 13.9%. The financial sector gap remains above 23% and progress has stalled over the past decade.',
  openGraph: {
    title: `Is the Gender Pay Gap Closing?`,
    description: 'The full-time gender pay gap is 7.7%, but the all-workers gap is 13.9%. The financial sector gap remains above 23% and progress has stalled over the past decade.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/gender-pay-gap-report',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Is the Gender Pay Gap Closing?`,
    description: 'The full-time gender pay gap is 7.7%, but the all-workers gap is 13.9%. The financial sector gap remains above 23% and progress has stalled over the past decade.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/gender-pay-gap-report',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

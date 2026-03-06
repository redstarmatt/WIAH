import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Britain&apos;s Roads Actually Falling Apart?',
  description: 'The local road maintenance backlog has reached &pound;16.3 billion, up 63&percnt; from 2015. Councils filled around 2.1 million potholes in 2024, but the rate of new damage continues to outpace repairs.',
  openGraph: {
    title: 'Are Britain&apos;s Roads Actually Falling Apart?',
    description: 'The local road maintenance backlog has reached &pound;16.3 billion, up 63&percnt; from 2015. Councils filled around 2.1 million potholes in 2024, but the rate of new damage continues to outpace repairs.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/pothole-roads',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Britain&apos;s Roads Actually Falling Apart?',
    description: 'The local road maintenance backlog has reached &pound;16.3 billion, up 63&percnt; from 2015. Councils filled around 2.1 million potholes in 2024, but the rate of new damage continues to outpace repairs.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/pothole-roads',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

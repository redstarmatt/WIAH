import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is wildfire becoming a UK problem?',
  description: 'Wildfires burned over 26,000 hectares in England in 2022 &mdash; a 570% increase on the previous decade&apos;s average. The record temperatures of July 2022 saw fires within the M25. Climate change is extending the fire season and increasing severity.',
  openGraph: {
    title: 'Is wildfire becoming a UK problem?',
    description: 'Wildfires burned over 26,000 hectares in England in 2022 &mdash; a 570% increase on the previous decade&apos;s average. The record temperatures of July 2022 saw fires within the M25. Climate change is extending the fire season and increasing severity.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/wildfire-risk',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is wildfire becoming a UK problem?',
    description: 'Wildfires burned over 26,000 hectares in England in 2022 &mdash; a 570% increase on the previous decade&apos;s average. The record temperatures of July 2022 saw fires within the M25. Climate change is extending the fire season and increasing severity.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/wildfire-risk',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

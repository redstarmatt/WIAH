import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `How Does Britain Actually Get Around?`,
  description: '63% of UK trips are by car, with cycling at just 1.5% and public transport at 7%. Car use has increased since 2019 as public transport recovered slower from the pandemic.',
  openGraph: {
    title: `How Does Britain Actually Get Around?`,
    description: '63% of UK trips are by car, with cycling at just 1.5% and public transport at 7%. Car use has increased since 2019 as public transport recovered slower from the pandemic.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/national-travel-survey',
  },
  twitter: {
    card: 'summary_large_image',
    title: `How Does Britain Actually Get Around?`,
    description: '63% of UK trips are by car, with cycling at just 1.5% and public transport at 7%. Car use has increased since 2019 as public transport recovered slower from the pandemic.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/national-travel-survey',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

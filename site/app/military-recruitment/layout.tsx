import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can Britain fill its armed forces?',
  description: 'The British Army has 72,520 trained personnel &mdash; below its 73,000 target and less than half its Cold War strength of 152,000. All three services are below establishment. Applications are rising but retention and conversion rates are falling.',
  openGraph: {
    title: 'Can Britain fill its armed forces?',
    description: 'The British Army has 72,520 trained personnel &mdash; below its 73,000 target and less than half its Cold War strength of 152,000. All three services are below establishment. Applications are rising but retention and conversion rates are falling.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/military-recruitment',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can Britain fill its armed forces?',
    description: 'The British Army has 72,520 trained personnel &mdash; below its 73,000 target and less than half its Cold War strength of 152,000. All three services are below establishment. Applications are rising but retention and conversion rates are falling.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/military-recruitment',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is NHS 111 Actually Working?',
  description: '26 million calls a year, 1 in 7 abandoned — NHS 111 is overwhelmed as it absorbs demand from A&amp;E and GP services.',
  openGraph: {
    title: 'Is NHS 111 Actually Working?',
    description: '26 million calls a year, 1 in 7 abandoned — NHS 111 is overwhelmed as it absorbs demand from A&amp;E and GP services.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-111-pressures',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is NHS 111 Actually Working?',
    description: '26 million calls a year, 1 in 7 abandoned — NHS 111 is overwhelmed as it absorbs demand from A&amp;E and GP services.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-111-pressures',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

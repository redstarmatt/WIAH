import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Who Is Caring for Children When Parents Can&rsquo;t?',
  description: '36,000 children live under special guardianship orders &mdash; a route that offers permanence without adoption, but with far less state support.',
  openGraph: {
    title: 'Who Is Caring for Children When Parents Can&rsquo;t?',
    description: '36,000 children live under special guardianship orders &mdash; a route that offers permanence without adoption, but with far less state support.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/special-guardianship-use',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Who Is Caring for Children When Parents Can&rsquo;t?',
    description: '36,000 children live under special guardianship orders &mdash; a route that offers permanence without adoption, but with far less state support.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/special-guardianship-use',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

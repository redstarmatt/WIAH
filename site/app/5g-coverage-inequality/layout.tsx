import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Who Gets 5G and Who Doesn't?',
  description: '5G coverage reaches 50% of the UK population but only 12% of rural areas, creating a growing digital divide.',
  openGraph: {
    title: 'Who Gets 5G and Who Doesn't?',
    description: '5G coverage reaches 50% of the UK population but only 12% of rural areas, creating a growing digital divide.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/5g-coverage-inequality',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Who Gets 5G and Who Doesn't?',
    description: '5G coverage reaches 50% of the UK population but only 12% of rural areas, creating a growing digital divide.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/5g-coverage-inequality',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

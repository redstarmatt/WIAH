import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is British Business Actually Using AI?',
  description: 'Less than half of large UK businesses use AI and only 1 in 7 small firms have adopted it, leaving Britain trailing peers in productivity gains.',
  openGraph: {
    title: 'Is British Business Actually Using AI?',
    description: 'Less than half of large UK businesses use AI and only 1 in 7 small firms have adopted it, leaving Britain trailing peers in productivity gains.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/ai-adoption-business',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is British Business Actually Using AI?',
    description: 'Less than half of large UK businesses use AI and only 1 in 7 small firms have adopted it, leaving Britain trailing peers in productivity gains.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/ai-adoption-business',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

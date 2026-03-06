import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Run-Down Are NHS Buildings?',
  description: 'The NHS maintenance backlog exceeds £11 billion, with a growing proportion rated as high or significant risk.',
  openGraph: {
    title: 'How Run-Down Are NHS Buildings?',
    description: 'The NHS maintenance backlog exceeds £11 billion, with a growing proportion rated as high or significant risk.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-estate-backlog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Run-Down Are NHS Buildings?',
    description: 'The NHS maintenance backlog exceeds £11 billion, with a growing proportion rated as high or significant risk.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-estate-backlog',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

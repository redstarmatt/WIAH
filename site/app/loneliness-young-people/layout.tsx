import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Lonely Are Young People?',
  description: 'Young adults aged 16-24 report the highest rates of chronic loneliness in the UK, with one in six experiencing it often or always.',
  openGraph: {
    title: 'How Lonely Are Young People?',
    description: 'Young adults aged 16-24 report the highest rates of chronic loneliness in the UK, with one in six experiencing it often or always.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/loneliness-young-people',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Lonely Are Young People?',
    description: 'Young adults aged 16-24 report the highest rates of chronic loneliness in the UK, with one in six experiencing it often or always.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/loneliness-young-people',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

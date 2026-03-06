import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `What's Actually Happening in Schools?`,
  description: 'Persistent absence has doubled since the pandemic and the attainment gap is at its widest in a decade. UK data on schools, teacher vacancies, SEND, and disadvantaged pupils.',
  openGraph: {
    title: `What's Actually Happening in Schools?`,
    description: 'Persistent absence has doubled since the pandemic and the attainment gap is at its widest in a decade. UK data on schools, teacher vacancies, SEND, and disadvantaged pupils.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/education',
  },
  twitter: {
    card: 'summary_large_image',
    title: `What's Actually Happening in Schools?`,
    description: 'Persistent absence has doubled since the pandemic and the attainment gap is at its widest in a decade. UK data on schools, teacher vacancies, SEND, and disadvantaged pupils.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/education',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

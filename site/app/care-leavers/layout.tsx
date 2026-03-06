import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Happens to Children Who Leave the Care System?',
  description: '95,000 children are in care in England. Each year 10,000 young people leave care aged 16–21 with 37% becoming NEET within a year. Care leavers are 4 times more likely to be criminalised. 25% become homeless within 2 years. Just 13% go to university, compared to 43% of the general population.',
  openGraph: {
    title: 'What Happens to Children Who Leave the Care System?',
    description: '95,000 children are in care in England. Each year 10,000 young people leave care aged 16–21 with 37% becoming NEET within a year. Care leavers are 4 times more likely to be criminalised. 25% become homeless within 2 years. Just 13% go to university, compared to 43% of the general population.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/care-leavers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Happens to Children Who Leave the Care System?',
    description: '95,000 children are in care in England. Each year 10,000 young people leave care aged 16–21 with 37% becoming NEET within a year. Care leavers are 4 times more likely to be criminalised. 25% become homeless within 2 years. Just 13% go to university, compared to 43% of the general population.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/care-leavers',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

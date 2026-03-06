import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are We Building Enough Homes?',
  description: 'England built 234,400 net new homes in 2022/23 — a third fewer than the government's 300,000-a-year target.',
  openGraph: {
    title: 'Are We Building Enough Homes?',
    description: 'England built 234,400 net new homes in 2022/23 — a third fewer than the government's 300,000-a-year target.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/construction-housebuilding',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are We Building Enough Homes?',
    description: 'England built 234,400 net new homes in 2022/23 — a third fewer than the government's 300,000-a-year target.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/construction-housebuilding',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

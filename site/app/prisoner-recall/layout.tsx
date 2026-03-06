import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many People Are Being Sent Back to Prison?',
  description: '14,000 prisoners are recalled to custody at any given time &mdash; making recall one of the fastest-growing drivers of the prison population crisis.',
  openGraph: {
    title: 'How Many People Are Being Sent Back to Prison?',
    description: '14,000 prisoners are recalled to custody at any given time &mdash; making recall one of the fastest-growing drivers of the prison population crisis.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/prisoner-recall',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many People Are Being Sent Back to Prison?',
    description: '14,000 prisoners are recalled to custody at any given time &mdash; making recall one of the fastest-growing drivers of the prison population crisis.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/prisoner-recall',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

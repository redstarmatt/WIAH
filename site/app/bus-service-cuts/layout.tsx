import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many Bus Routes Have Been Cut?',
  description: 'England has lost 40% of its local bus miles since 2010, with 3,000 villages now having no bus service &mdash; a public transport collapse outside cities.',
  openGraph: {
    title: 'How Many Bus Routes Have Been Cut?',
    description: 'England has lost 40% of its local bus miles since 2010, with 3,000 villages now having no bus service &mdash; a public transport collapse outside cities.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/bus-service-cuts',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many Bus Routes Have Been Cut?',
    description: 'England has lost 40% of its local bus miles since 2010, with 3,000 villages now having no bus service &mdash; a public transport collapse outside cities.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/bus-service-cuts',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

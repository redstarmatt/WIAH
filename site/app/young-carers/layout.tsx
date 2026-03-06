import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How many children are caring for adults?',
  description: '800,000 children in the UK are providing unpaid care for a family member, often missing school and missing out on childhood — yet most are invisible to the services that could support them.',
  openGraph: {
    title: 'How many children are caring for adults?',
    description: '800,000 children in the UK are providing unpaid care for a family member, often missing school and missing out on childhood — yet most are invisible to the services that could support them.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/young-carers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How many children are caring for adults?',
    description: '800,000 children in the UK are providing unpaid care for a family member, often missing school and missing out on childhood — yet most are invisible to the services that could support them.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/young-carers',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

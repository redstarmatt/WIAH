import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can families afford childcare?',
  description: 'The UK has some of the highest childcare costs in the developed world relative to wages, with a full-time nursery place for a child under two costing £14,800 a year — more than university tuition fees.',
  openGraph: {
    title: 'Can families afford childcare?',
    description: 'The UK has some of the highest childcare costs in the developed world relative to wages, with a full-time nursery place for a child under two costing £14,800 a year — more than university tuition fees.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/early-years',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can families afford childcare?',
    description: 'The UK has some of the highest childcare costs in the developed world relative to wages, with a full-time nursery place for a child under two costing £14,800 a year — more than university tuition fees.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/early-years',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

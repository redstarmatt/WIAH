import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Antibiotics Still Working?',
  description: 'Drug-resistant infections kill an estimated 7,000 people in the UK each year, and without action, AMR could become one of the leading causes of death globally by 2050.',
  openGraph: {
    title: 'Are Antibiotics Still Working?',
    description: 'Drug-resistant infections kill an estimated 7,000 people in the UK each year, and without action, AMR could become one of the leading causes of death globally by 2050.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/antibiotic-resistance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Antibiotics Still Working?',
    description: 'Drug-resistant infections kill an estimated 7,000 people in the UK each year, and without action, AMR could become one of the leading causes of death globally by 2050.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/antibiotic-resistance',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

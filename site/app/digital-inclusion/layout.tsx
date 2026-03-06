import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Who Is Being Left Behind Online?',
  description: 'Around 8 million UK adults lack basic digital skills. 1.5 million households have no internet access. Older adults, disabled people, and those in lower-income households are most affected. The UK ranks 10th in Europe on DESI (Digital Economy and Society Index). Being offline costs an estimated £1,064 per year in higher prices.',
  openGraph: {
    title: 'Who Is Being Left Behind Online?',
    description: 'Around 8 million UK adults lack basic digital skills. 1.5 million households have no internet access. Older adults, disabled people, and those in lower-income households are most affected. The UK ranks 10th in Europe on DESI (Digital Economy and Society Index). Being offline costs an estimated £1,064 per year in higher prices.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/digital-inclusion',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Who Is Being Left Behind Online?',
    description: 'Around 8 million UK adults lack basic digital skills. 1.5 million households have no internet access. Older adults, disabled people, and those in lower-income households are most affected. The UK ranks 10th in Europe on DESI (Digital Economy and Society Index). Being offline costs an estimated £1,064 per year in higher prices.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/digital-inclusion',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

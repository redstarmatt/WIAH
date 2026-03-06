import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Are So Many People Using Food Banks?',
  description: 'The Trussell Trust distributed 3.1 million food parcels in 2023/24 — more than triple the 2013/14 total. 1.1 million went to children. The independent food bank sector adds a further 30%. 7.2 million UK households experienced food insecurity in 2022/23.',
  openGraph: {
    title: 'Why Are So Many People Using Food Banks?',
    description: 'The Trussell Trust distributed 3.1 million food parcels in 2023/24 — more than triple the 2013/14 total. 1.1 million went to children. The independent food bank sector adds a further 30%. 7.2 million UK households experienced food insecurity in 2022/23.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/food-banks',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Are So Many People Using Food Banks?',
    description: 'The Trussell Trust distributed 3.1 million food parcels in 2023/24 — more than triple the 2013/14 total. 1.1 million went to children. The independent food bank sector adds a further 30%. 7.2 million UK households experienced food insecurity in 2022/23.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/food-banks',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

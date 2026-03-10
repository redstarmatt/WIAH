import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Many People Are Using Food Banks?",
  description: "The Trussell Trust distributed 2.9 million food parcels in 2024-25 \u2014 48\u00d7 the 2010-11 figure. A million went to children. Independent food banks add a further 1.5 million+ distributions.",
  openGraph: {
    title: "How Many People Are Using Food Banks?",
    description: "The Trussell Trust distributed 2.9 million food parcels in 2024-25 \u2014 48\u00d7 the 2010-11 figure. A million went to children. Independent food banks add a further 1.5 million+ distributions.",
    type: 'article',
    url: "https://whatisactuallyhappening.uk/food-bank-growth",
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Many People Are Using Food Banks?",
    description: "The Trussell Trust distributed 2.9 million food parcels in 2024-25 \u2014 48\u00d7 the 2010-11 figure. A million went to children. Independent food banks add a further 1.5 million+ distributions.",
  },
  alternates: {
    canonical: "https://whatisactuallyhappening.uk/food-bank-growth",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>({children})</>;
}

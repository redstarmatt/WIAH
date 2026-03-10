import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Many People Are Chronically Lonely?",
  description: "3.83 million adults in England are chronically lonely \u2014 7.1% of the population. Young adults (16-24) now report higher loneliness than the elderly.",
  openGraph: {
    title: "How Many People Are Chronically Lonely?",
    description: "3.83 million adults in England are chronically lonely \u2014 7.1% of the population. Young adults (16-24) now report higher loneliness than the elderly.",
    type: 'article',
    url: "https://whatisactuallyhappening.uk/loneliness-statistics",
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Many People Are Chronically Lonely?",
    description: "3.83 million adults in England are chronically lonely \u2014 7.1% of the population. Young adults (16-24) now report higher loneliness than the elderly.",
  },
  alternates: {
    canonical: "https://whatisactuallyhappening.uk/loneliness-statistics",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>({children})</>;
}

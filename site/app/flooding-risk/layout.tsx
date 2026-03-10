import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Many Homes Are at Risk of Flooding?",
  description: "5.4 million properties in England are at flood risk. Only 54% of flood defence assets are in good condition \u2014 down from 67% in 2019 \u2014 as maintenance falls behind investment in new schemes.",
  openGraph: {
    title: "How Many Homes Are at Risk of Flooding?",
    description: "5.4 million properties in England are at flood risk. Only 54% of flood defence assets are in good condition \u2014 down from 67% in 2019 \u2014 as maintenance falls behind investment in new schemes.",
    type: 'article',
    url: "https://whatisactuallyhappening.uk/flooding-risk",
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Many Homes Are at Risk of Flooding?",
    description: "5.4 million properties in England are at flood risk. Only 54% of flood defence assets are in good condition \u2014 down from 67% in 2019 \u2014 as maintenance falls behind investment in new schemes.",
  },
  alternates: {
    canonical: "https://whatisactuallyhappening.uk/flooding-risk",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>({children})</>;
}

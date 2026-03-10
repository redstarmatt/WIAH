import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is the North-South Divide Getting Worse?",
  description: "London's GVA per head is 2.7\u00d7 the UK average and widening. Despite decades of levelling-up commitments, the North-South productivity divide has grown since 1998.",
  openGraph: {
    title: "Is the North-South Divide Getting Worse?",
    description: "London's GVA per head is 2.7\u00d7 the UK average and widening. Despite decades of levelling-up commitments, the North-South productivity divide has grown since 1998.",
    type: 'article',
    url: "https://whatisactuallyhappening.uk/regional-gdp",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is the North-South Divide Getting Worse?",
    description: "London's GVA per head is 2.7\u00d7 the UK average and widening. Despite decades of levelling-up commitments, the North-South productivity divide has grown since 1998.",
  },
  alternates: {
    canonical: "https://whatisactuallyhappening.uk/regional-gdp",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>({children})</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "What Has Happened to Britain's Buses?",
  description: "Bus journeys outside London have fallen 45% since 1985. Over 3,000 subsidised routes have been cut since 2010 as local authority budgets shrank.",
  openGraph: {
    title: "What Has Happened to Britain's Buses?",
    description: "Bus journeys outside London have fallen 45% since 1985. Over 3,000 subsidised routes have been cut since 2010 as local authority budgets shrank.",
    type: 'article',
    url: "https://whatisactuallyhappening.uk/bus-services",
  },
  twitter: {
    card: 'summary_large_image',
    title: "What Has Happened to Britain's Buses?",
    description: "Bus journeys outside London have fallen 45% since 1985. Over 3,000 subsidised routes have been cut since 2010 as local authority budgets shrank.",
  },
  alternates: {
    canonical: "https://whatisactuallyhappening.uk/bus-services",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>({children})</>;
}

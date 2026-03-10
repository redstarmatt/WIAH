import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Many People Are Crossing the Channel in Small Boats?",
  description: "45,183 people crossed the English Channel in small boats in the year to September 2025 \u2014 a 51% rise. Over 190,000 have crossed since 2018 as the asylum backlog works down from a 134,000 peak.",
  openGraph: {
    title: "How Many People Are Crossing the Channel in Small Boats?",
    description: "45,183 people crossed the English Channel in small boats in the year to September 2025 \u2014 a 51% rise. Over 190,000 have crossed since 2018 as the asylum backlog works down from a 134,000 peak.",
    type: 'article',
    url: "https://whatisactuallyhappening.uk/small-boats",
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Many People Are Crossing the Channel in Small Boats?",
    description: "45,183 people crossed the English Channel in small boats in the year to September 2025 \u2014 a 51% rise. Over 190,000 have crossed since 2018 as the asylum backlog works down from a 134,000 peak.",
  },
  alternates: {
    canonical: "https://whatisactuallyhappening.uk/small-boats",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>({children})</>;
}

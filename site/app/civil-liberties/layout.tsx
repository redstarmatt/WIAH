import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is the State Acquiring Too Much Power Over Citizens?',
  description: "The UK has an estimated 5.2 million CCTV cameras — one per 13 people, the highest density of any democracy. Since 2014, a series of laws has expanded surveillance powers, restricted protest rights, and extended pre-charge detention. CIVICUS has downgraded Britain's civic space rating, and Liberty and other organisations document a pattern of incremental erosion that individually looks modest but cumulatively is significant.",
  openGraph: {
    title: 'Is the State Acquiring Too Much Power Over Citizens?',
    description: "The UK has an estimated 5.2 million CCTV cameras — one per 13 people, the highest density of any democracy. Since 2014, a series of laws has expanded surveillance powers, restricted protest rights, and extended pre-charge detention. CIVICUS has downgraded Britain's civic space rating, and Liberty and other organisations document a pattern of incremental erosion that individually looks modest but cumulatively is significant.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/civil-liberties',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is the State Acquiring Too Much Power Over Citizens?',
    description: "The UK has an estimated 5.2 million CCTV cameras — one per 13 people, the highest density of any democracy. Since 2014, a series of laws has expanded surveillance powers, restricted protest rights, and extended pre-charge detention. CIVICUS has downgraded Britain's civic space rating, and Liberty and other organisations document a pattern of incremental erosion that individually looks modest but cumulatively is significant.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/civil-liberties',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

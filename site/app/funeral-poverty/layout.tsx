import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can Families Afford to Bury Their Dead?',
  description: "The average cost of a funeral in the UK is now £4,141 — up 130% since 2004. Around 110,000 families each year cannot afford the cost of burying a loved one without financial help. Funeral poverty disproportionately affects low-income households, and the government's Funeral Expenses Payment covers only a fraction of average costs.",
  openGraph: {
    title: 'Can Families Afford to Bury Their Dead?',
    description: "The average cost of a funeral in the UK is now £4,141 — up 130% since 2004. Around 110,000 families each year cannot afford the cost of burying a loved one without financial help. Funeral poverty disproportionately affects low-income households, and the government's Funeral Expenses Payment covers only a fraction of average costs.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/funeral-poverty',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can Families Afford to Bury Their Dead?',
    description: "The average cost of a funeral in the UK is now £4,141 — up 130% since 2004. Around 110,000 families each year cannot afford the cost of burying a loved one without financial help. Funeral poverty disproportionately affects low-income households, and the government's Funeral Expenses Payment covers only a fraction of average costs.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/funeral-poverty',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

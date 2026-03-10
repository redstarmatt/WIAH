import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Prison Education Working?",
  description: "Only 28% of prisoners engage in education each week — down from 34% in 2013. The education budget has been cut 40% since 2010. 57% of prisoners have no formal qualifications on entry. The evidence that education reduces reoffending is overwhelming.",
  openGraph: {
    title: "Is Prison Education Working?",
    description: "Only 28% of prisoners engage in education each week — down from 34% in 2013. The education budget has been cut 40% since 2010. 57% of prisoners have no formal qualifications on entry. The evidence that education reduces reoffending is overwhelming.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/prison-education',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Prison Education Working?",
    description: "Only 28% of prisoners engage in education each week — down from 34% in 2013. The education budget has been cut 40% since 2010. 57% of prisoners have no formal qualifications on entry. The evidence that education reduces reoffending is overwhelming.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/prison-education',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

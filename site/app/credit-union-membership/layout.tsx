import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Does Britain Have So Few Credit Union Members?",
  description: "Only 2.1 million people — 3% of the adult population — belong to a credit union, compared to 75% in Ireland. Credit unions offer affordable loans and savings to people excluded from mainstream banking.",
  openGraph: {
    title: "Why Does Britain Have So Few Credit Union Members?",
    description: "Only 2.1 million people — 3% of the adult population — belong to a credit union, compared to 75% in Ireland. Credit unions offer affordable loans and savings to people excluded from mainstream banking.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/credit-union-membership',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Does Britain Have So Few Credit Union Members?",
    description: "Only 2.1 million people — 3% of the adult population — belong to a credit union, compared to 75% in Ireland. Credit unions offer affordable loans and savings to people excluded from mainstream banking.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/credit-union-membership',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

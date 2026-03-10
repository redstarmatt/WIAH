import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Are Court Fees Pricing People Out of Justice?",
  description: "Civil court claims have fallen 33% since 2015 following fee increases that the Supreme Court has repeatedly criticised. Employment tribunal fee income was ruled unlawful in 2017, but fee barriers persist.",
  openGraph: {
    title: "Are Court Fees Pricing People Out of Justice?",
    description: "Civil court claims have fallen 33% since 2015 following fee increases that the Supreme Court has repeatedly criticised. Employment tribunal fee income was ruled unlawful in 2017, but fee barriers persist.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/court-fees-access',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Are Court Fees Pricing People Out of Justice?",
    description: "Civil court claims have fallen 33% since 2015 following fee increases that the Supreme Court has repeatedly criticised. Employment tribunal fee income was ruled unlawful in 2017, but fee barriers persist.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/court-fees-access',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Many People Are Borrowing from Illegal Lenders?",
  description: "An estimated 1.08 million people in England are borrowing from illegal money lenders — up as credit tightens. Average debt stands at £4,500 at APRs of 1,000% or more. Only 84 prosecutions were brought last year.",
  openGraph: {
    title: "How Many People Are Borrowing from Illegal Lenders?",
    description: "An estimated 1.08 million people in England are borrowing from illegal money lenders — up as credit tightens. Average debt stands at £4,500 at APRs of 1,000% or more. Only 84 prosecutions were brought last year.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/loan-sharks',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Many People Are Borrowing from Illegal Lenders?",
    description: "An estimated 1.08 million people in England are borrowing from illegal money lenders — up as credit tightens. Average debt stands at £4,500 at APRs of 1,000% or more. Only 84 prosecutions were brought last year.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/loan-sharks',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

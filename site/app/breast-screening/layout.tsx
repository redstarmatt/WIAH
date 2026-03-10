import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Has Breast Screening Coverage Recovered from the Pandemic?",
  description: "Breast screening coverage fell to a 25-year low during the pandemic and has not recovered. Coverage is now 71.1% against a 75% target.",
  openGraph: {
    title: "Has Breast Screening Coverage Recovered from the Pandemic?",
    description: "Breast screening coverage fell to a 25-year low during the pandemic and has not recovered. Coverage is now 71.1% against a 75% target.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/breast-screening',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Has Breast Screening Coverage Recovered from the Pandemic?",
    description: "Breast screening coverage fell to a 25-year low during the pandemic and has not recovered. Coverage is now 71.1% against a 75% target.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/breast-screening',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

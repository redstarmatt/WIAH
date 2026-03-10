import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Has the NHS Eliminated Hepatitis C?",
  description: "82,000 people in the UK are estimated to be living with undiagnosed hepatitis C — down from 160,000 in 2015. Direct-acting antivirals have transformed the disease from chronic to curable, but the testing pathway needs rebuilding after COVID.",
  openGraph: {
    title: "Has the NHS Eliminated Hepatitis C?",
    description: "82,000 people in the UK are estimated to be living with undiagnosed hepatitis C — down from 160,000 in 2015. Direct-acting antivirals have transformed the disease from chronic to curable, but the testing pathway needs rebuilding after COVID.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/hepatitis-c-treatment',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Has the NHS Eliminated Hepatitis C?",
    description: "82,000 people in the UK are estimated to be living with undiagnosed hepatitis C — down from 160,000 in 2015. Direct-acting antivirals have transformed the disease from chronic to curable, but the testing pathway needs rebuilding after COVID.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/hepatitis-c-treatment',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

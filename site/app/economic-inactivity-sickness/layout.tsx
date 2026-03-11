import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Why Have 2.8 Million People Left Work Due to Ill-Health?`,
  description: 'Long-term sickness now keeps 2.8 million people out of work — more than double the 2000 level. Mental health conditions account for 38% of cases, having overtaken musculoskeletal problems.',
  openGraph: {
    title: `Why Have 2.8 Million People Left Work Due to Ill-Health?`,
    description: 'Long-term sickness now keeps 2.8 million people out of work — more than double the 2000 level. Mental health conditions account for 38% of cases, having overtaken musculoskeletal problems.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/economic-inactivity-sickness',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Why Have 2.8 Million People Left Work Due to Ill-Health?`,
    description: 'Long-term sickness now keeps 2.8 million people out of work — more than double the 2000 level. Mental health conditions account for 38% of cases, having overtaken musculoskeletal problems.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/economic-inactivity-sickness',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

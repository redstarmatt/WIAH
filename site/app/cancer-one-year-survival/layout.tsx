import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many Cancer Patients Survive One Year?',
  description: 'One-year cancer survival has improved steadily but the UK still lags behind comparable European nations.',
  openGraph: {
    title: 'How Many Cancer Patients Survive One Year?',
    description: 'One-year cancer survival has improved steadily but the UK still lags behind comparable European nations.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/cancer-one-year-survival',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many Cancer Patients Survive One Year?',
    description: 'One-year cancer survival has improved steadily but the UK still lags behind comparable European nations.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/cancer-one-year-survival',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are people taking up cancer screening?',
  description: 'Cancer screening uptake in England has fallen below recommended thresholds for all three national screening programmes, with younger age groups and deprived communities significantly less likely to attend.',
  openGraph: {
    title: 'Are people taking up cancer screening?',
    description: 'Cancer screening uptake in England has fallen below recommended thresholds for all three national screening programmes, with younger age groups and deprived communities significantly less likely to attend.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-screening',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are people taking up cancer screening?',
    description: 'Cancer screening uptake in England has fallen below recommended thresholds for all three national screening programmes, with younger age groups and deprived communities significantly less likely to attend.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-screening',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

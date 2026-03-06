import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Who Waits Longest for NHS Treatment?',
  description: 'Patients in the most deprived areas wait on average 20% longer for elective treatment than those in the least deprived.',
  openGraph: {
    title: 'Who Waits Longest for NHS Treatment?',
    description: 'Patients in the most deprived areas wait on average 20% longer for elective treatment than those in the least deprived.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-waiting-list-inequality',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Who Waits Longest for NHS Treatment?',
    description: 'Patients in the most deprived areas wait on average 20% longer for elective treatment than those in the least deprived.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-waiting-list-inequality',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

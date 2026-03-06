import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Does the NHS have enough staff?',
  description: 'The NHS in England has over 112,000 vacancies — a vacancy rate of 8.4% — with nursing and mental health the most acute shortfalls, underpinned by a decade of underinvestment in training and poor workforce retention.',
  openGraph: {
    title: 'Does the NHS have enough staff?',
    description: 'The NHS in England has over 112,000 vacancies — a vacancy rate of 8.4% — with nursing and mental health the most acute shortfalls, underpinned by a decade of underinvestment in training and poor workforce retention.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-workforce',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Does the NHS have enough staff?',
    description: 'The NHS in England has over 112,000 vacancies — a vacancy rate of 8.4% — with nursing and mental health the most acute shortfalls, underpinned by a decade of underinvestment in training and poor workforce retention.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-workforce',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

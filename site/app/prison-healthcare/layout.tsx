import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Prison Healthcare Adequate?",
  description: "A third of prisons are rated poor or inadequate for healthcare by inspectors. An estimated 70% of prisoners have a diagnosable mental illness — nine times the community rate. Primary care vacancies inside prisons drive most of the failures.",
  openGraph: {
    title: "Is Prison Healthcare Adequate?",
    description: "A third of prisons are rated poor or inadequate for healthcare by inspectors. An estimated 70% of prisoners have a diagnosable mental illness — nine times the community rate. Primary care vacancies inside prisons drive most of the failures.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/prison-healthcare',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Prison Healthcare Adequate?",
    description: "A third of prisons are rated poor or inadequate for healthcare by inspectors. An estimated 70% of prisoners have a diagnosable mental illness — nine times the community rate. Primary care vacancies inside prisons drive most of the failures.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/prison-healthcare',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

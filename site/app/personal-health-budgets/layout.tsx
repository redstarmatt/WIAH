import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Personal Health Budgets Working?',
  description: 'Uptake of personal health budgets has grown but remains below NHS targets, with wide regional variation.',
  openGraph: {
    title: 'Are Personal Health Budgets Working?',
    description: 'Uptake of personal health budgets has grown but remains below NHS targets, with wide regional variation.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/personal-health-budgets',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Personal Health Budgets Working?',
    description: 'Uptake of personal health budgets has grown but remains below NHS targets, with wide regional variation.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/personal-health-budgets',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

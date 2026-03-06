import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Do people still trust British institutions?',
  description: 'Trust in politicians has fallen to just 12% — the lowest ever recorded. Trust in the NHS has fallen from 72% to 51% since 2010. But nurses (94%) and doctors (91%) remain among the most trusted professionals in the world.',
  openGraph: {
    title: 'Do people still trust British institutions?',
    description: 'Trust in politicians has fallen to just 12% — the lowest ever recorded. Trust in the NHS has fallen from 72% to 51% since 2010. But nurses (94%) and doctors (91%) remain among the most trusted professionals in the world.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/trust-institutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Do people still trust British institutions?',
    description: 'Trust in politicians has fallen to just 12% — the lowest ever recorded. Trust in the NHS has fallen from 72% to 51% since 2010. But nurses (94%) and doctors (91%) remain among the most trusted professionals in the world.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/trust-institutions',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

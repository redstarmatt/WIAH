import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How is facial recognition being used by UK police?',
  description: 'The Metropolitan Police carried out 97 live facial recognition deployments in 2024, identifying 454 people &mdash; but with a significant false positive rate.',
  openGraph: {
    title: 'How is facial recognition being used by UK police?',
    description: 'The Metropolitan Police carried out 97 live facial recognition deployments in 2024, identifying 454 people &mdash; but with a significant false positive rate.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/facial-recognition-policing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How is facial recognition being used by UK police?',
    description: 'The Metropolitan Police carried out 97 live facial recognition deployments in 2024, identifying 454 people &mdash; but with a significant false positive rate.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/facial-recognition-policing',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

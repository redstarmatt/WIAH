import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What happens after prison?',
  description: 'Over half of adults released from prison reoffend within a year, and the reoffending rate for short-sentence prisoners is 64% &mdash; yet the courses, treatment, and post-release support that cut reoffending are chronically underfunded.',
  openGraph: {
    title: 'What happens after prison?',
    description: 'Over half of adults released from prison reoffend within a year, and the reoffending rate for short-sentence prisoners is 64% &mdash; yet the courses, treatment, and post-release support that cut reoffending are chronically underfunded.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/prison-reoffending',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What happens after prison?',
    description: 'Over half of adults released from prison reoffend within a year, and the reoffending rate for short-sentence prisoners is 64% &mdash; yet the courses, treatment, and post-release support that cut reoffending are chronically underfunded.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/prison-reoffending',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

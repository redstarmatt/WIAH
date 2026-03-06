import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Often Does the NHS Make Serious Mistakes?',
  description: '392 &lsquo;never events&rsquo; &mdash; mistakes so serious they should never occur &mdash; were recorded in 2023/24, alongside 12,400 serious incidents.',
  openGraph: {
    title: 'How Often Does the NHS Make Serious Mistakes?',
    description: '392 &lsquo;never events&rsquo; &mdash; mistakes so serious they should never occur &mdash; were recorded in 2023/24, alongside 12,400 serious incidents.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/patient-safety-incidents',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Often Does the NHS Make Serious Mistakes?',
    description: '392 &lsquo;never events&rsquo; &mdash; mistakes so serious they should never occur &mdash; were recorded in 2023/24, alongside 12,400 serious incidents.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/patient-safety-incidents',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

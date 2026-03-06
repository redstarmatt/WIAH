import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is the NHS Losing Its Sight on Eye Care?',
  description: 'Over 630,000 patients are waiting for NHS ophthalmology appointments, and 22,000 people are at risk of preventable sight loss due to delayed follow-ups — described as a &ldquo;patient safety scandal&rdquo; by the Royal College of Ophthalmologists.',
  openGraph: {
    title: 'Is the NHS Losing Its Sight on Eye Care?',
    description: 'Over 630,000 patients are waiting for NHS ophthalmology appointments, and 22,000 people are at risk of preventable sight loss due to delayed follow-ups — described as a &ldquo;patient safety scandal&rdquo; by the Royal College of Ophthalmologists.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/eye-care',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is the NHS Losing Its Sight on Eye Care?',
    description: 'Over 630,000 patients are waiting for NHS ophthalmology appointments, and 22,000 people are at risk of preventable sight loss due to delayed follow-ups — described as a &ldquo;patient safety scandal&rdquo; by the Royal College of Ophthalmologists.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/eye-care',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is the NHS Embracing Digital Health?',
  description: 'NHS digital transformation remains patchy, with wide variation in electronic records, telemedicine, and AI adoption across trusts.',
  openGraph: {
    title: 'Is the NHS Embracing Digital Health?',
    description: 'NHS digital transformation remains patchy, with wide variation in electronic records, telemedicine, and AI adoption across trusts.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/health-tech-adoption',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is the NHS Embracing Digital Health?',
    description: 'NHS digital transformation remains patchy, with wide variation in electronic records, telemedicine, and AI adoption across trusts.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/health-tech-adoption',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

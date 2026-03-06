import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can you get legal advice if you can&apos;t afford a solicitor?',
  description: '54% of local authority areas in England and Wales have no housing legal aid provider, leaving millions without access to legal help.',
  openGraph: {
    title: 'Can you get legal advice if you can&apos;t afford a solicitor?',
    description: '54% of local authority areas in England and Wales have no housing legal aid provider, leaving millions without access to legal help.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/civil-legal-aid-deserts',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can you get legal advice if you can&apos;t afford a solicitor?',
    description: '54% of local authority areas in England and Wales have no housing legal aid provider, leaving millions without access to legal help.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/civil-legal-aid-deserts',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

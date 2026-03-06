import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can You Actually Get an NHS Dentist?',
  description: 'NHS dentistry has effectively collapsed for millions. Nearly half of adults cannot access an NHS dentist, and the workforce continues to shrink as practitioners shift to private practice.',
  openGraph: {
    title: 'Can You Actually Get an NHS Dentist?',
    description: 'NHS dentistry has effectively collapsed for millions. Nearly half of adults cannot access an NHS dentist, and the workforce continues to shrink as practitioners shift to private practice.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/dental',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can You Actually Get an NHS Dentist?',
    description: 'NHS dentistry has effectively collapsed for millions. Nearly half of adults cannot access an NHS dentist, and the workforce continues to shrink as practitioners shift to private practice.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/dental',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

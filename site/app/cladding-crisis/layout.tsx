import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How many buildings still have dangerous cladding?',
  description: '4,603 residential buildings over 11 metres have unsafe cladding &mdash; 5 years after Grenfell. Only 30% have been fully remediated by 2024. Around 1 million residents are affected, with buildings taking years to fix.',
  openGraph: {
    title: 'How many buildings still have dangerous cladding?',
    description: '4,603 residential buildings over 11 metres have unsafe cladding &mdash; 5 years after Grenfell. Only 30% have been fully remediated by 2024. Around 1 million residents are affected, with buildings taking years to fix.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/cladding-crisis',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How many buildings still have dangerous cladding?',
    description: '4,603 residential buildings over 11 metres have unsafe cladding &mdash; 5 years after Grenfell. Only 30% have been fully remediated by 2024. Around 1 million residents are affected, with buildings taking years to fix.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/cladding-crisis',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

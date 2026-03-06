import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many Young People Are Being Admitted for Self-Harm?',
  description: 'Hospital admissions for self-harm among young women aged 15-19 have risen by over 70% in a decade.',
  openGraph: {
    title: 'How Many Young People Are Being Admitted for Self-Harm?',
    description: 'Hospital admissions for self-harm among young women aged 15-19 have risen by over 70% in a decade.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/self-harm-hospital-admissions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many Young People Are Being Admitted for Self-Harm?',
    description: 'Hospital admissions for self-harm among young women aged 15-19 have risen by over 70% in a decade.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/self-harm-hospital-admissions',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

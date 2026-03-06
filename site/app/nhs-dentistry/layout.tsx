import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can you still get an NHS dentist?',
  description: 'NHS dental treatment has collapsed since the pandemic, with 42&percnt; of adults unable to access an NHS dentist and children&apos;s tooth extractions becoming the most common childhood hospital procedure.',
  openGraph: {
    title: 'Can you still get an NHS dentist?',
    description: 'NHS dental treatment has collapsed since the pandemic, with 42&percnt; of adults unable to access an NHS dentist and children&apos;s tooth extractions becoming the most common childhood hospital procedure.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-dentistry',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can you still get an NHS dentist?',
    description: 'NHS dental treatment has collapsed since the pandemic, with 42&percnt; of adults unable to access an NHS dentist and children&apos;s tooth extractions becoming the most common childhood hospital procedure.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-dentistry',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

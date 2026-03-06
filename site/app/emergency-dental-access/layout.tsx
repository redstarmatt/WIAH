import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can People Access Emergency Dental Treatment?',
  description: '14 million people cannot access an NHS dentist, and A&E visits for dental pain have reached 180,000 per year — a crisis playing out in hospital emergency departments.',
  openGraph: {
    title: 'Can People Access Emergency Dental Treatment?',
    description: '14 million people cannot access an NHS dentist, and A&E visits for dental pain have reached 180,000 per year — a crisis playing out in hospital emergency departments.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/emergency-dental-access',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can People Access Emergency Dental Treatment?',
    description: '14 million people cannot access an NHS dentist, and A&E visits for dental pain have reached 180,000 per year — a crisis playing out in hospital emergency departments.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/emergency-dental-access',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are There Enough Mental Health Beds?',
  description: 'Mental health inpatient beds have been cut by over 40% since 1998, with occupancy rates regularly exceeding 100%.',
  openGraph: {
    title: 'Are There Enough Mental Health Beds?',
    description: 'Mental health inpatient beds have been cut by over 40% since 1998, with occupancy rates regularly exceeding 100%.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/mental-health-crisis-beds',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are There Enough Mental Health Beds?',
    description: 'Mental health inpatient beds have been cut by over 40% since 1998, with occupancy rates regularly exceeding 100%.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/mental-health-crisis-beds',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

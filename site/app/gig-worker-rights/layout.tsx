import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `What Protections Do Gig Workers Actually Have?`,
  description: '4.4 million gig economy workers lack basic employment protections. Only 28% receive sick pay and 32% have pension auto-enrolment, while gig work has grown 60% since 2016.',
  openGraph: {
    title: `What Protections Do Gig Workers Actually Have?`,
    description: '4.4 million gig economy workers lack basic employment protections. Only 28% receive sick pay and 32% have pension auto-enrolment, while gig work has grown 60% since 2016.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/gig-worker-rights',
  },
  twitter: {
    card: 'summary_large_image',
    title: `What Protections Do Gig Workers Actually Have?`,
    description: '4.4 million gig economy workers lack basic employment protections. Only 28% receive sick pay and 32% have pension auto-enrolment, while gig work has grown 60% since 2016.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/gig-worker-rights',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

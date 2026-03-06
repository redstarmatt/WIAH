import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Are Paramedics Waiting Hours Outside Hospitals?',
  description: 'In 2023/24, ambulances spent 1.8 million hours queuing outside hospitals waiting to hand over patients &mdash; time when crews could have been responding to new 999 calls, leaving communities without emergency cover.',
  openGraph: {
    title: 'Why Are Paramedics Waiting Hours Outside Hospitals?',
    description: 'In 2023/24, ambulances spent 1.8 million hours queuing outside hospitals waiting to hand over patients &mdash; time when crews could have been responding to new 999 calls, leaving communities without emergency cover.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/ambulance-handovers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Are Paramedics Waiting Hours Outside Hospitals?',
    description: 'In 2023/24, ambulances spent 1.8 million hours queuing outside hospitals waiting to hand over patients &mdash; time when crews could have been responding to new 999 calls, leaving communities without emergency cover.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/ambulance-handovers',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ambulance Handovers',
  description: 'In 2023/24, ambulances spent 1.8 million hours queuing outside hospitals waiting to hand over patients time when crews could have been responding to new 999 cal',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Heat Networks Delivering Low-Carbon Heating?',
  description: 'Heat networks supply less than 3% of UK heat demand — far below the 20% target for 2050 — and many existing networks still emit more than individual boilers.',
  openGraph: {
    title: 'Are Heat Networks Delivering Low-Carbon Heating?',
    description: 'Heat networks supply less than 3% of UK heat demand — far below the 20% target for 2050 — and many existing networks still emit more than individual boilers.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/heat-network-rollout',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Heat Networks Delivering Low-Carbon Heating?',
    description: 'Heat networks supply less than 3% of UK heat demand — far below the 20% target for 2050 — and many existing networks still emit more than individual boilers.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/heat-network-rollout',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

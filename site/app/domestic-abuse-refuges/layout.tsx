import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is There Still a Refuge Space Shortage?",
  description: "35% of refuge bed requests are turned away each day — nearly 100 women per day unable to access a safe space. The Domestic Abuse Act 2021 has driven investment, but demand continues to outpace supply.",
  openGraph: {
    title: "Is There Still a Refuge Space Shortage?",
    description: "35% of refuge bed requests are turned away each day — nearly 100 women per day unable to access a safe space. The Domestic Abuse Act 2021 has driven investment, but demand continues to outpace supply.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/domestic-abuse-refuges',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is There Still a Refuge Space Shortage?",
    description: "35% of refuge bed requests are turned away each day — nearly 100 women per day unable to access a safe space. The Domestic Abuse Act 2021 has driven investment, but demand continues to outpace supply.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/domestic-abuse-refuges',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

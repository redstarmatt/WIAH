import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Men Getting the Mental Health Support They Need?',
  description: 'Men account for 75% of suicides yet are significantly less likely to access mental health services.',
  openGraph: {
    title: 'Are Men Getting the Mental Health Support They Need?',
    description: 'Men account for 75% of suicides yet are significantly less likely to access mental health services.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/men-mental-health-gap',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Men Getting the Mental Health Support They Need?',
    description: 'Men account for 75% of suicides yet are significantly less likely to access mental health services.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/men-mental-health-gap',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

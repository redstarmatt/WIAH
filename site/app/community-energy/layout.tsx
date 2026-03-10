import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Much Energy Do British Communities Generate?",
  description: "Community energy projects now generate 350 MW — enough to power 350,000 homes. Capacity has grown 80% since 2020, but grid connection costs remain a major barrier to further growth.",
  openGraph: {
    title: "How Much Energy Do British Communities Generate?",
    description: "Community energy projects now generate 350 MW — enough to power 350,000 homes. Capacity has grown 80% since 2020, but grid connection costs remain a major barrier to further growth.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/community-energy',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Much Energy Do British Communities Generate?",
    description: "Community energy projects now generate 350 MW — enough to power 350,000 homes. Capacity has grown 80% since 2020, but grid connection costs remain a major barrier to further growth.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/community-energy',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

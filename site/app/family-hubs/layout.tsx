import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Are Family Hubs Replacing Children's Centres?",
  description: "399 family hubs have opened across England since 2021, but 1,350 children's centres have closed since 2010. Family hubs are not replacing the full range of services that Sure Start provided.",
  openGraph: {
    title: "Are Family Hubs Replacing Children's Centres?",
    description: "399 family hubs have opened across England since 2021, but 1,350 children's centres have closed since 2010. Family hubs are not replacing the full range of services that Sure Start provided.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/family-hubs',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Are Family Hubs Replacing Children's Centres?",
    description: "399 family hubs have opened across England since 2021, but 1,350 children's centres have closed since 2010. Family hubs are not replacing the full range of services that Sure Start provided.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/family-hubs',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

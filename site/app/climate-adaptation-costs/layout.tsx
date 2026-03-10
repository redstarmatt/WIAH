import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Much Is Climate Change Already Costing Britain?",
  description: "The estimated annual economic cost of climate impacts in the UK has risen to £22 billion — flooding, heat mortality, coastal erosion. The government spends less than 4% of this on adaptation.",
  openGraph: {
    title: "How Much Is Climate Change Already Costing Britain?",
    description: "The estimated annual economic cost of climate impacts in the UK has risen to £22 billion — flooding, heat mortality, coastal erosion. The government spends less than 4% of this on adaptation.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/climate-adaptation-costs',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Much Is Climate Change Already Costing Britain?",
    description: "The estimated annual economic cost of climate impacts in the UK has risen to £22 billion — flooding, heat mortality, coastal erosion. The government spends less than 4% of this on adaptation.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/climate-adaptation-costs',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

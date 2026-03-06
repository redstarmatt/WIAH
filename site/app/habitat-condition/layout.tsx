import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "What condition is Britain's protected natural environment in?",
  description: "Only 53.6% of England's Sites of Special Scientific Interest are in favourable condition — well below the 70% target. Lowland meadows have declined by 99.6% since 1940. Hedgerow length has halved since 1950.",
  openGraph: {
    title: "What condition is Britain's protected natural environment in?",
    description: "Only 53.6% of England's Sites of Special Scientific Interest are in favourable condition — well below the 70% target. Lowland meadows have declined by 99.6% since 1940. Hedgerow length has halved since 1950.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/habitat-condition',
  },
  twitter: {
    card: 'summary_large_image',
    title: "What condition is Britain's protected natural environment in?",
    description: "Only 53.6% of England's Sites of Special Scientific Interest are in favourable condition — well below the 70% target. Lowland meadows have declined by 99.6% since 1940. Hedgerow length has halved since 1950.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/habitat-condition',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

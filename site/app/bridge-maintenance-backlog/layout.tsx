import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "What is actually happening with Bridge Maintenance Backlog?",
  description: "Data on bridge maintenance backlog in the UK.",
  openGraph: {
    title: "What is actually happening with Bridge Maintenance Backlog?",
    description: "Data on bridge maintenance backlog in the UK.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/bridge-maintenance-backlog',
  },
  twitter: {
    card: 'summary_large_image',
    title: "What is actually happening with Bridge Maintenance Backlog?",
    description: "Data on bridge maintenance backlog in the UK.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/bridge-maintenance-backlog',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

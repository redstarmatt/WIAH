import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Are 1.6 Million People Waiting for a Hearing Assessment?",
  description: "Audiology has the longest backlog in the NHS — 1.6 million people waiting, with average waits of 32 weeks. The 6-week access standard has been abandoned.",
  openGraph: {
    title: "Why Are 1.6 Million People Waiting for a Hearing Assessment?",
    description: "Audiology has the longest backlog in the NHS — 1.6 million people waiting, with average waits of 32 weeks. The 6-week access standard has been abandoned.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/audiology-waits',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Are 1.6 Million People Waiting for a Hearing Assessment?",
    description: "Audiology has the longest backlog in the NHS — 1.6 million people waiting, with average waits of 32 weeks. The 6-week access standard has been abandoned.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/audiology-waits',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

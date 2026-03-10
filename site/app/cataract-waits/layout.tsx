import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Are 650,000 People Waiting for Cataract Surgery?",
  description: "The cataract backlog is 650,000 — up from 120,000 before the pandemic. The median wait is now 41 weeks. Cataracts are the most common elective surgery and blindness is preventable.",
  openGraph: {
    title: "Why Are 650,000 People Waiting for Cataract Surgery?",
    description: "The cataract backlog is 650,000 — up from 120,000 before the pandemic. The median wait is now 41 weeks. Cataracts are the most common elective surgery and blindness is preventable.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/cataract-waits',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Are 650,000 People Waiting for Cataract Surgery?",
    description: "The cataract backlog is 650,000 — up from 120,000 before the pandemic. The median wait is now 41 weeks. Cataracts are the most common elective surgery and blindness is preventable.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/cataract-waits',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

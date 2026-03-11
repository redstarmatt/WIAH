import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Britain's Rail Network Actually Working?",
  description: "Only 59.2% of UK trains arrived on time in 2024-25 \u2014 far below the 92% target. Cancellations hit a record 4.0%. Fares rose 4.9% in 2024, 94% above 1995 levels in real terms.",
  openGraph: {
    title: "Is Britain's Rail Network Actually Working?",
    description: "Only 59.2% of UK trains arrived on time in 2024-25 \u2014 far below the 92% target. Cancellations hit a record 4.0%. Fares rose 4.9% in 2024, 94% above 1995 levels in real terms.",
    type: 'article',
    url: "https://whatisactuallyhappening.uk/rail-performance",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Britain's Rail Network Actually Working?",
    description: "Only 59.2% of UK trains arrived on time in 2024-25 \u2014 far below the 92% target. Cancellations hit a record 4.0%. Fares rose 4.9% in 2024, 94% above 1995 levels in real terms.",
  },
  alternates: {
    canonical: "https://whatisactuallyhappening.uk/rail-performance",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>({children})</>;
}

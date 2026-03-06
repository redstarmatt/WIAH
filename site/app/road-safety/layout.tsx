import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How dangerous are Britain's roads?",
  description: 'Road deaths in Great Britain fell dramatically from 7,000 in 1972 to 1,695 in 2023 — but progress stalled after 2010, and cyclists and pedestrians remain significantly more vulnerable than car occupants.',
  openGraph: {
    title: "How dangerous are Britain's roads?",
    description: 'Road deaths in Great Britain fell dramatically from 7,000 in 1972 to 1,695 in 2023 — but progress stalled after 2010, and cyclists and pedestrians remain significantly more vulnerable than car occupants.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/road-safety',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How dangerous are Britain's roads?",
    description: 'Road deaths in Great Britain fell dramatically from 7,000 in 1972 to 1,695 in 2023 — but progress stalled after 2010, and cyclists and pedestrians remain significantly more vulnerable than car occupants.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/road-safety',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

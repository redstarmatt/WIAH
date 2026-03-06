import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain investing enough in research and innovation?',
  description: 'The UK spent 1.73% of GDP on R&D in 2021 — well below the OECD target of 2.4% and the G7 average of 2.66%. South Korea invests 4.93%. The UK's technology industries grow in spite of, not because of, public investment.',
  openGraph: {
    title: 'Is Britain investing enough in research and innovation?',
    description: 'The UK spent 1.73% of GDP on R&D in 2021 — well below the OECD target of 2.4% and the G7 average of 2.66%. South Korea invests 4.93%. The UK's technology industries grow in spite of, not because of, public investment.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/rd-investment',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain investing enough in research and innovation?',
    description: 'The UK spent 1.73% of GDP on R&D in 2021 — well below the OECD target of 2.4% and the G7 average of 2.66%. South Korea invests 4.93%. The UK's technology industries grow in spite of, not because of, public investment.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/rd-investment',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

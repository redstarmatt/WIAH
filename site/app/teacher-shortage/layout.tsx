import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain Running Out of Teachers?',
  description: 'England missed its secondary school teacher recruitment targets for 10 of 17 subjects in 2022/23. The teacher vacancy rate stands at 3.1% — the highest since records began. 40% of new teachers leave within five years. Real-terms teacher pay has fallen 11% since 2010.',
  openGraph: {
    title: 'Is Britain Running Out of Teachers?',
    description: 'England missed its secondary school teacher recruitment targets for 10 of 17 subjects in 2022/23. The teacher vacancy rate stands at 3.1% — the highest since records began. 40% of new teachers leave within five years. Real-terms teacher pay has fallen 11% since 2010.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/teacher-shortage',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain Running Out of Teachers?',
    description: 'England missed its secondary school teacher recruitment targets for 10 of 17 subjects in 2022/23. The teacher vacancy rate stands at 3.1% — the highest since records began. 40% of new teachers leave within five years. Real-terms teacher pay has fallen 11% since 2010.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/teacher-shortage',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

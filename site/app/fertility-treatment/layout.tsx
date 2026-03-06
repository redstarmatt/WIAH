import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is IVF on the NHS Actually Available?',
  description: 'Only 45&percnt; of integrated care systems offer the NICE-recommended three cycles of IVF &mdash; leaving couples paying &pound;5,000&ndash;&pound;10,000 per cycle out of pocket, with NHS waiting times stretching to 18 months.',
  openGraph: {
    title: 'Is IVF on the NHS Actually Available?',
    description: 'Only 45&percnt; of integrated care systems offer the NICE-recommended three cycles of IVF &mdash; leaving couples paying &pound;5,000&ndash;&pound;10,000 per cycle out of pocket, with NHS waiting times stretching to 18 months.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/fertility-treatment',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is IVF on the NHS Actually Available?',
    description: 'Only 45&percnt; of integrated care systems offer the NICE-recommended three cycles of IVF &mdash; leaving couples paying &pound;5,000&ndash;&pound;10,000 per cycle out of pocket, with NHS waiting times stretching to 18 months.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/fertility-treatment',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

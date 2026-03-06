import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain Actually Bringing Nature Back?',
  description: 'The UK has committed to protecting 30&percnt; of land for nature by 2030 &mdash; the so-called 30x30 pledge &mdash; but only 3.2&percnt; of land currently meets ecological standards. With fewer than four years remaining, the target is almost certainly out of reach without a step-change in both ambition and delivery.',
  openGraph: {
    title: 'Is Britain Actually Bringing Nature Back?',
    description: 'The UK has committed to protecting 30&percnt; of land for nature by 2030 &mdash; the so-called 30x30 pledge &mdash; but only 3.2&percnt; of land currently meets ecological standards. With fewer than four years remaining, the target is almost certainly out of reach without a step-change in both ambition and delivery.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/rewilding',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain Actually Bringing Nature Back?',
    description: 'The UK has committed to protecting 30&percnt; of land for nature by 2030 &mdash; the so-called 30x30 pledge &mdash; but only 3.2&percnt; of land currently meets ecological standards. With fewer than four years remaining, the target is almost certainly out of reach without a step-change in both ambition and delivery.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/rewilding',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

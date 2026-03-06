import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Has Austerity Done to Britain&apos;s Arts?',
  description: 'Arts Council England&apos;s budget fell 36&percnt; in real terms between 2010 and 2024. Local authority arts spending fell 57&percnt; over the same period. In the 2023 portfolio rebalancing, 140 arts organisations lost all their funding &mdash; including several that had been continuously funded for decades &mdash; while 24 areas received new investment as part of a &ldquo;levelling up&rdquo; reallocation that many in the sector regard as having disrupted established excellence without adequately building new capacity.',
  openGraph: {
    title: 'What Has Austerity Done to Britain&apos;s Arts?',
    description: 'Arts Council England&apos;s budget fell 36&percnt; in real terms between 2010 and 2024. Local authority arts spending fell 57&percnt; over the same period. In the 2023 portfolio rebalancing, 140 arts organisations lost all their funding &mdash; including several that had been continuously funded for decades &mdash; while 24 areas received new investment as part of a &ldquo;levelling up&rdquo; reallocation that many in the sector regard as having disrupted established excellence without adequately building new capacity.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/arts-funding',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Has Austerity Done to Britain&apos;s Arts?',
    description: 'Arts Council England&apos;s budget fell 36&percnt; in real terms between 2010 and 2024. Local authority arts spending fell 57&percnt; over the same period. In the 2023 portfolio rebalancing, 140 arts organisations lost all their funding &mdash; including several that had been continuously funded for decades &mdash; while 24 areas received new investment as part of a &ldquo;levelling up&rdquo; reallocation that many in the sector regard as having disrupted established excellence without adequately building new capacity.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/arts-funding',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

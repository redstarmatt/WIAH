import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain actually recycling more?',
  description: 'England&apos;s recycling rate has stalled at around 44% for a decade &mdash; below the EU average of 48% and far short of the 65% target for 2035. The good news: landfill has collapsed from 38% to 6% since 2010.',
  openGraph: {
    title: 'Is Britain actually recycling more?',
    description: 'England&apos;s recycling rate has stalled at around 44% for a decade &mdash; below the EU average of 48% and far short of the 65% target for 2035. The good news: landfill has collapsed from 38% to 6% since 2010.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/circular-economy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain actually recycling more?',
    description: 'England&apos;s recycling rate has stalled at around 44% for a decade &mdash; below the EU average of 48% and far short of the 65% target for 2035. The good news: landfill has collapsed from 38% to 6% since 2010.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/circular-economy',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

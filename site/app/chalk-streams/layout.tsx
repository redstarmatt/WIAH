import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Britain&apos;s Unique Chalk Streams Being Destroyed?',
  description: 'England holds 85&percnt; of the world&apos;s chalk streams &mdash; rare ecosystems sometimes called &ldquo;the rainforest of the rivers&rdquo; &mdash; yet 95&percnt; are in poor ecological condition. Over-abstraction, sewage discharges, and invasive species have devastated habitats that took millennia to form and cannot be recreated elsewhere on Earth.',
  openGraph: {
    title: 'Are Britain&apos;s Unique Chalk Streams Being Destroyed?',
    description: 'England holds 85&percnt; of the world&apos;s chalk streams &mdash; rare ecosystems sometimes called &ldquo;the rainforest of the rivers&rdquo; &mdash; yet 95&percnt; are in poor ecological condition. Over-abstraction, sewage discharges, and invasive species have devastated habitats that took millennia to form and cannot be recreated elsewhere on Earth.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/chalk-streams',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Britain&apos;s Unique Chalk Streams Being Destroyed?',
    description: 'England holds 85&percnt; of the world&apos;s chalk streams &mdash; rare ecosystems sometimes called &ldquo;the rainforest of the rivers&rdquo; &mdash; yet 95&percnt; are in poor ecological condition. Over-abstraction, sewage discharges, and invasive species have devastated habitats that took millennia to form and cannot be recreated elsewhere on Earth.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/chalk-streams',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

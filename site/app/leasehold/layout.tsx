import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Do You Really Own Your Home If You&apos;re a Leaseholder?',
  description: 'Nearly 5 million homes in England and Wales are held on a leasehold basis &mdash; a feudal tenure system that gives freeholders the power to charge escalating ground rents, impose permission fees, and ultimately forfeit properties for arrears as small as &pound;350. Ground rent complaints to the Property Tribunal have tripled since 2015.',
  openGraph: {
    title: 'Do You Really Own Your Home If You&apos;re a Leaseholder?',
    description: 'Nearly 5 million homes in England and Wales are held on a leasehold basis &mdash; a feudal tenure system that gives freeholders the power to charge escalating ground rents, impose permission fees, and ultimately forfeit properties for arrears as small as &pound;350. Ground rent complaints to the Property Tribunal have tripled since 2015.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/leasehold',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Do You Really Own Your Home If You&apos;re a Leaseholder?',
    description: 'Nearly 5 million homes in England and Wales are held on a leasehold basis &mdash; a feudal tenure system that gives freeholders the power to charge escalating ground rents, impose permission fees, and ultimately forfeit properties for arrears as small as &pound;350. Ground rent complaints to the Property Tribunal have tripled since 2015.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/leasehold',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Is the Gig Economy Actually Doing to Workers?',
  description: 'An estimated 4.4 million people work in the gig economy &mdash; typically earning below minimum wage once costs are deducted &mdash; with no sick pay, no pension, and no guaranteed hours.',
  openGraph: {
    title: 'What Is the Gig Economy Actually Doing to Workers?',
    description: 'An estimated 4.4 million people work in the gig economy &mdash; typically earning below minimum wage once costs are deducted &mdash; with no sick pay, no pension, and no guaranteed hours.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/gig-economy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is the Gig Economy Actually Doing to Workers?',
    description: 'An estimated 4.4 million people work in the gig economy &mdash; typically earning below minimum wage once costs are deducted &mdash; with no sick pay, no pension, and no guaranteed hours.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/gig-economy',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

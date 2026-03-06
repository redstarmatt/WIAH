import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Is UK Productivity Lagging?',
  description: 'UK output per hour is 16% below the G7 average, a gap that has widened since 2008.',
  openGraph: {
    title: 'Why Is UK Productivity Lagging?',
    description: 'UK output per hour is 16% below the G7 average, a gap that has widened since 2008.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/uk-productivity-gap',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Is UK Productivity Lagging?',
    description: 'UK output per hour is 16% below the G7 average, a gap that has widened since 2008.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/uk-productivity-gap',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

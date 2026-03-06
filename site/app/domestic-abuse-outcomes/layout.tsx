import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Happens When You Report Domestic Abuse?',
  description: 'Police receive 1.5 million domestic abuse calls a year &mdash; but only 1 in 10 results in a prosecution.',
  openGraph: {
    title: 'What Happens When You Report Domestic Abuse?',
    description: 'Police receive 1.5 million domestic abuse calls a year &mdash; but only 1 in 10 results in a prosecution.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/domestic-abuse-outcomes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Happens When You Report Domestic Abuse?',
    description: 'Police receive 1.5 million domestic abuse calls a year &mdash; but only 1 in 10 results in a prosecution.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/domestic-abuse-outcomes',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

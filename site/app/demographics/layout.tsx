import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What&apos;s Actually Happening to Britain&apos;s Population?',
  description: 'UK data and statistics on what&apos;s actually happening to britain&apos;s population?. What is actually happening?',
  openGraph: {
    title: 'What&apos;s Actually Happening to Britain&apos;s Population?',
    description: 'UK data and statistics on what&apos;s actually happening to britain&apos;s population?. What is actually happening?',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/demographics',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What&apos;s Actually Happening to Britain&apos;s Population?',
    description: 'UK data and statistics on what&apos;s actually happening to britain&apos;s population?. What is actually happening?',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/demographics',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

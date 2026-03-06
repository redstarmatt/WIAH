import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Long Must Disabled People Wait for Benefits?',
  description: 'New PIP claimants wait an average of 24 weeks for a decision &mdash; and when they appeal, 71% of tribunal decisions overturn the DWP&rsquo;s original ruling.',
  openGraph: {
    title: 'How Long Must Disabled People Wait for Benefits?',
    description: 'New PIP claimants wait an average of 24 weeks for a decision &mdash; and when they appeal, 71% of tribunal decisions overturn the DWP&rsquo;s original ruling.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/pip-assessment-backlog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Long Must Disabled People Wait for Benefits?',
    description: 'New PIP claimants wait an average of 24 weeks for a decision &mdash; and when they appeal, 71% of tribunal decisions overturn the DWP&rsquo;s original ruling.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/pip-assessment-backlog',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

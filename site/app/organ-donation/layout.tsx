import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is the Opt-Out System Saving Lives?',
  description: 'Over 6,300 people are waiting for a transplant in the UK, and around 350 die each year before one becomes available. England&rsquo;s opt-out organ donation law, introduced in 2020, has helped lift family consent rates to 73% — but transplant numbers have not yet returned to pre-pandemic highs.',
  openGraph: {
    title: 'Is the Opt-Out System Saving Lives?',
    description: 'Over 6,300 people are waiting for a transplant in the UK, and around 350 die each year before one becomes available. England&rsquo;s opt-out organ donation law, introduced in 2020, has helped lift family consent rates to 73% — but transplant numbers have not yet returned to pre-pandemic highs.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/organ-donation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is the Opt-Out System Saving Lives?',
    description: 'Over 6,300 people are waiting for a transplant in the UK, and around 350 die each year before one becomes available. England&rsquo;s opt-out organ donation law, introduced in 2020, has helped lift family consent rates to 73% — but transplant numbers have not yet returned to pre-pandemic highs.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/organ-donation',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

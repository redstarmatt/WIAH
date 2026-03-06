import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How many social homes are being built?',
  description: 'Just 6,400 social rented homes were built in England in 2021/22 &mdash; compared to 152,000 in 1975. Average social rent is £100 per week vs £230 for market rent. 1.2 million households are on the waiting list.',
  openGraph: {
    title: 'How many social homes are being built?',
    description: 'Just 6,400 social rented homes were built in England in 2021/22 &mdash; compared to 152,000 in 1975. Average social rent is £100 per week vs £230 for market rent. 1.2 million households are on the waiting list.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/social-rent',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How many social homes are being built?',
    description: 'Just 6,400 social rented homes were built in England in 2021/22 &mdash; compared to 152,000 in 1975. Average social rent is £100 per week vs £230 for market rent. 1.2 million households are on the waiting list.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/social-rent',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain Finally Planting More Trees?',
  description: 'England planted 7,164 hectares of new trees in 2024/25 &mdash; the highest rate in over 20 years, up 156% since 2021/22. The acceleration is real and verified by the Forestry Commission. The challenge remains closing the gap to the 30,000 hectares per year the Climate Change Committee says is needed.',
  openGraph: {
    title: 'Is Britain Finally Planting More Trees?',
    description: 'England planted 7,164 hectares of new trees in 2024/25 &mdash; the highest rate in over 20 years, up 156% since 2021/22. The acceleration is real and verified by the Forestry Commission. The challenge remains closing the gap to the 30,000 hectares per year the Climate Change Committee says is needed.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/trees-and-forests',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain Finally Planting More Trees?',
    description: 'England planted 7,164 hectares of new trees in 2024/25 &mdash; the highest rate in over 20 years, up 156% since 2021/22. The acceleration is real and verified by the Forestry Commission. The challenge remains closing the gap to the 30,000 hectares per year the Climate Change Committee says is needed.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/trees-and-forests',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

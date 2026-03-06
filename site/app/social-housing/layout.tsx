import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Is Social Housing Disappearing?',
  description: 'Only 7,500 social rent homes were built in 2023 &mdash; a 17-year low. 1.29 million households are on waiting lists. Since 1980, 1.8 million council homes have been sold under Right to Buy. The social housing stock has shrunk from 4.8 million to 4.0 million.',
  openGraph: {
    title: 'Why Is Social Housing Disappearing?',
    description: 'Only 7,500 social rent homes were built in 2023 &mdash; a 17-year low. 1.29 million households are on waiting lists. Since 1980, 1.8 million council homes have been sold under Right to Buy. The social housing stock has shrunk from 4.8 million to 4.0 million.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/social-housing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Is Social Housing Disappearing?',
    description: 'Only 7,500 social rent homes were built in 2023 &mdash; a 17-year low. 1.29 million households are on waiting lists. Since 1980, 1.8 million council homes have been sold under Right to Buy. The social housing stock has shrunk from 4.8 million to 4.0 million.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/social-housing',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

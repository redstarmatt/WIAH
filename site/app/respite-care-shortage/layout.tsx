import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can carers actually get a break?',
  description: 'Just 41% of unpaid carers say they can access respite care when they need it, down from 56% in 2015.',
  openGraph: {
    title: 'Can carers actually get a break?',
    description: 'Just 41% of unpaid carers say they can access respite care when they need it, down from 56% in 2015.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/respite-care-shortage',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can carers actually get a break?',
    description: 'Just 41% of unpaid carers say they can access respite care when they need it, down from 56% in 2015.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/respite-care-shortage',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

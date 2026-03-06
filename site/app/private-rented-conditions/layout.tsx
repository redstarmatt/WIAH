import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Your Rented Home Safe?',
  description: '21% of private rented homes fail the Decent Homes Standard &mdash; and 1.8 million renters live with damp or mould that landlords are failing to fix.',
  openGraph: {
    title: 'Is Your Rented Home Safe?',
    description: '21% of private rented homes fail the Decent Homes Standard &mdash; and 1.8 million renters live with damp or mould that landlords are failing to fix.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/private-rented-conditions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Your Rented Home Safe?',
    description: '21% of private rented homes fail the Decent Homes Standard &mdash; and 1.8 million renters live with damp or mould that landlords are failing to fix.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/private-rented-conditions',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

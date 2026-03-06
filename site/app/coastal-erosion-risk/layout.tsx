import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Your Home About to Fall Into the Sea?',
  description: '100,000 homes face significant coastal erosion risk by 2050 &mdash; and managed retreat means some communities will be allowed to flood permanently.',
  openGraph: {
    title: 'Is Your Home About to Fall Into the Sea?',
    description: '100,000 homes face significant coastal erosion risk by 2050 &mdash; and managed retreat means some communities will be allowed to flood permanently.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/coastal-erosion-risk',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Your Home About to Fall Into the Sea?',
    description: '100,000 homes face significant coastal erosion risk by 2050 &mdash; and managed retreat means some communities will be allowed to flood permanently.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/coastal-erosion-risk',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

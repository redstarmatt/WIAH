import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Long Is the Wait for Social Housing?',
  description: '1.29 million households are on social housing waiting lists in England, with the typical wait in London now over 10 years.',
  openGraph: {
    title: 'How Long Is the Wait for Social Housing?',
    description: '1.29 million households are on social housing waiting lists in England, with the typical wait in London now over 10 years.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/social-housing-waiting-lists',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Long Is the Wait for Social Housing?',
    description: '1.29 million households are on social housing waiting lists in England, with the typical wait in London now over 10 years.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/social-housing-waiting-lists',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

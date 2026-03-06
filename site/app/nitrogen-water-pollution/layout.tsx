import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Farming Poisoning Our Rivers?',
  description: '83% of English rivers fail nitrate water quality standards, driven overwhelmingly by agricultural fertiliser runoff.',
  openGraph: {
    title: 'Is Farming Poisoning Our Rivers?',
    description: '83% of English rivers fail nitrate water quality standards, driven overwhelmingly by agricultural fertiliser runoff.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nitrogen-water-pollution',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Farming Poisoning Our Rivers?',
    description: '83% of English rivers fail nitrate water quality standards, driven overwhelmingly by agricultural fertiliser runoff.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nitrogen-water-pollution',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

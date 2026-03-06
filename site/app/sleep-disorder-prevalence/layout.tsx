import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain Sleeping Badly?',
  description: 'An estimated 1 in 3 UK adults report poor sleep, with insomnia prescriptions rising and links to chronic disease well established.',
  openGraph: {
    title: 'Is Britain Sleeping Badly?',
    description: 'An estimated 1 in 3 UK adults report poor sleep, with insomnia prescriptions rising and links to chronic disease well established.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/sleep-disorder-prevalence',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain Sleeping Badly?',
    description: 'An estimated 1 in 3 UK adults report poor sleep, with insomnia prescriptions rising and links to chronic disease well established.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/sleep-disorder-prevalence',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

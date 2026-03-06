import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Common Is Spiking?',
  description: 'Police recorded spiking reports more than doubled between 2019 and 2024, though under-reporting remains significant.',
  openGraph: {
    title: 'How Common Is Spiking?',
    description: 'Police recorded spiking reports more than doubled between 2019 and 2024, though under-reporting remains significant.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/spiking-reports',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Common Is Spiking?',
    description: 'Police recorded spiking reports more than doubled between 2019 and 2024, though under-reporting remains significant.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/spiking-reports',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

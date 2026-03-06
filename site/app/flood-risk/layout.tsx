import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is flood risk getting worse?',
  description: '5.2 million properties in England are at risk of flooding, and the cost of flood damage has tripled since 2000 as climate change intensifies extreme weather events.',
  openGraph: {
    title: 'Is flood risk getting worse?',
    description: '5.2 million properties in England are at risk of flooding, and the cost of flood damage has tripled since 2000 as climate change intensifies extreme weather events.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/flood-risk',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is flood risk getting worse?',
    description: '5.2 million properties in England are at risk of flooding, and the cost of flood damage has tripled since 2000 as climate change intensifies extreme weather events.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/flood-risk',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many Children Are in Care?',
  description: '83,840 children were in local authority care in England in 2023 &mdash; a 24% rise since 2010, driven by rising poverty and insufficient family support.',
  openGraph: {
    title: 'How Many Children Are in Care?',
    description: '83,840 children were in local authority care in England in 2023 &mdash; a 24% rise since 2010, driven by rising poverty and insufficient family support.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/children-in-care',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many Children Are in Care?',
    description: '83,840 children were in local authority care in England in 2023 &mdash; a 24% rise since 2010, driven by rising poverty and insufficient family support.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/children-in-care',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

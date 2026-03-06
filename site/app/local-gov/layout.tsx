import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Your Council Actually Going Broke?',
  description: 'Local government funding has fallen 32% in real terms since 2010, forcing councils to cut services, raise council tax by 59%, and eight councils have issued Section 114 notices declaring they cannot meet their financial obligations.',
  openGraph: {
    title: 'Is Your Council Actually Going Broke?',
    description: 'Local government funding has fallen 32% in real terms since 2010, forcing councils to cut services, raise council tax by 59%, and eight councils have issued Section 114 notices declaring they cannot meet their financial obligations.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/local-gov',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Your Council Actually Going Broke?',
    description: 'Local government funding has fallen 32% in real terms since 2010, forcing councils to cut services, raise council tax by 59%, and eight councils have issued Section 114 notices declaring they cannot meet their financial obligations.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/local-gov',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

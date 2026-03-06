import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is knife crime actually falling?',
  description: 'After peaking in 2023/24, knife crime is now falling. Youth knife offending has declined for six consecutive years. Hospital admissions for knife assaults — the most reliable indicator — fell 10% in 2024/25 to their lowest level since 2018.',
  openGraph: {
    title: 'Is knife crime actually falling?',
    description: 'After peaking in 2023/24, knife crime is now falling. Youth knife offending has declined for six consecutive years. Hospital admissions for knife assaults — the most reliable indicator — fell 10% in 2024/25 to their lowest level since 2018.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/knife-crime',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is knife crime actually falling?',
    description: 'After peaking in 2023/24, knife crime is now falling. Youth knife offending has declined for six consecutive years. Hospital admissions for knife assaults — the most reliable indicator — fell 10% in 2024/25 to their lowest level since 2018.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/knife-crime',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

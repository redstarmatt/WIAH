import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Children Breathing Clean Air at School?',
  description: `Nearly 1 million UK children attend schools in areas exceeding WHO pollution guidelines, though London's ULEZ has begun to show measurable progress.`,
  openGraph: {
    title: 'Are Children Breathing Clean Air at School?',
    description: `Nearly 1 million UK children attend schools in areas exceeding WHO pollution guidelines, though London's ULEZ has begun to show measurable progress.`,
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/air-quality-schools',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Children Breathing Clean Air at School?',
    description: `Nearly 1 million UK children attend schools in areas exceeding WHO pollution guidelines, though London's ULEZ has begun to show measurable progress.`,
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/air-quality-schools',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is democracy actually working?',
  description: 'General election turnout has recovered since its 2001 low but remains below the post-war average, while local election participation has collapsed to under 30&percnt; in many areas.',
  openGraph: {
    title: 'Is democracy actually working?',
    description: 'General election turnout has recovered since its 2001 low but remains below the post-war average, while local election participation has collapsed to under 30&percnt; in many areas.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/voter-turnout',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is democracy actually working?',
    description: 'General election turnout has recovered since its 2001 low but remains below the post-war average, while local election participation has collapsed to under 30&percnt; in many areas.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/voter-turnout',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

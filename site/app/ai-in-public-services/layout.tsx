import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Is AI Making Public Services Better or Just Cheaper?`,
  description: 'Over 200 AI projects are running across UK government departments, but public trust remains low and transparency is patchy. Algorithmic tools in benefits and policing face legal challenge.',
  openGraph: {
    title: `Is AI Making Public Services Better or Just Cheaper?`,
    description: 'Over 200 AI projects are running across UK government departments, but public trust remains low and transparency is patchy. Algorithmic tools in benefits and policing face legal challenge.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/ai-in-public-services',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Is AI Making Public Services Better or Just Cheaper?`,
    description: 'Over 200 AI projects are running across UK government departments, but public trust remains low and transparency is patchy. Algorithmic tools in benefits and policing face legal challenge.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/ai-in-public-services',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is the Post Office Network Actually Surviving?',
  description: 'The UK has lost 7,210 post office branches since 2000, a decline of 39&percnt;. Around 11,180 remain, but rural communities have been disproportionately affected, with 15&percnt; of the rural population now more than 3 miles from a branch.',
  openGraph: {
    title: 'Is the Post Office Network Actually Surviving?',
    description: 'The UK has lost 7,210 post office branches since 2000, a decline of 39&percnt;. Around 11,180 remain, but rural communities have been disproportionately affected, with 15&percnt; of the rural population now more than 3 miles from a branch.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/post-offices',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is the Post Office Network Actually Surviving?',
    description: 'The UK has lost 7,210 post office branches since 2000, a decline of 39&percnt;. Around 11,180 remain, but rural communities have been disproportionately affected, with 15&percnt; of the rural population now more than 3 miles from a branch.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/post-offices',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

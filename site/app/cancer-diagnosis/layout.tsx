import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many Cancers Are Being Caught Too Late?',
  description: 'Only 54&percnt; of cancers in England are diagnosed at stages 1 or 2, against a target of 75&percnt; by 2028. Stage 4 bowel cancer has a 7&percnt; five-year survival rate compared to 97&percnt; at stage 1 &mdash; making late diagnosis one of the NHS&apos;s most consequential failures.',
  openGraph: {
    title: 'How Many Cancers Are Being Caught Too Late?',
    description: 'Only 54&percnt; of cancers in England are diagnosed at stages 1 or 2, against a target of 75&percnt; by 2028. Stage 4 bowel cancer has a 7&percnt; five-year survival rate compared to 97&percnt; at stage 1 &mdash; making late diagnosis one of the NHS&apos;s most consequential failures.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/cancer-diagnosis',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many Cancers Are Being Caught Too Late?',
    description: 'Only 54&percnt; of cancers in England are diagnosed at stages 1 or 2, against a target of 75&percnt; by 2028. Stage 4 bowel cancer has a 7&percnt; five-year survival rate compared to 97&percnt; at stage 1 &mdash; making late diagnosis one of the NHS&apos;s most consequential failures.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/cancer-diagnosis',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

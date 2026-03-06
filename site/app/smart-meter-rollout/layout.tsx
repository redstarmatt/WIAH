import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many Homes Actually Have a Working Smart Meter?',
  description: "57% of UK homes have a smart meter, but 25% of installed meters are operating in &lsquo;dumb mode&rsquo; — not communicating with suppliers — undermining the programme's purpose.",
  openGraph: {
    title: 'How Many Homes Actually Have a Working Smart Meter?',
    description: "57% of UK homes have a smart meter, but 25% of installed meters are operating in &lsquo;dumb mode&rsquo; — not communicating with suppliers — undermining the programme's purpose.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/smart-meter-rollout',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many Homes Actually Have a Working Smart Meter?',
    description: "57% of UK homes have a smart meter, but 25% of installed meters are operating in &lsquo;dumb mode&rsquo; — not communicating with suppliers — undermining the programme's purpose.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/smart-meter-rollout',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

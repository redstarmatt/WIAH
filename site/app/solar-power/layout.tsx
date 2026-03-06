import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Far Has Britain's Solar Revolution Got?",
  description: 'The UK now has 15.8 GW of installed solar — enough to power 5 million homes — but solar still generates only 5&percnt; of annual electricity. The technology is proven and the costs are at record lows, yet large-scale deployment faces persistent planning and grid connection barriers.',
  openGraph: {
    title: "How Far Has Britain's Solar Revolution Got?",
    description: 'The UK now has 15.8 GW of installed solar — enough to power 5 million homes — but solar still generates only 5&percnt; of annual electricity. The technology is proven and the costs are at record lows, yet large-scale deployment faces persistent planning and grid connection barriers.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/solar-power',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Far Has Britain's Solar Revolution Got?",
    description: 'The UK now has 15.8 GW of installed solar — enough to power 5 million homes — but solar still generates only 5&percnt; of annual electricity. The technology is proven and the costs are at record lows, yet large-scale deployment faces persistent planning and grid connection barriers.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/solar-power',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

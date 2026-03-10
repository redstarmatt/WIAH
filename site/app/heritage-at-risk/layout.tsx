import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Much of Britain's Heritage Is at Risk of Being Lost?",
  description: "4,848 historic buildings and sites are on Historic England's Heritage at Risk register — including 2,780 listed buildings. Progress has been steady but is slowing as funding pressures grow.",
  openGraph: {
    title: "How Much of Britain's Heritage Is at Risk of Being Lost?",
    description: "4,848 historic buildings and sites are on Historic England's Heritage at Risk register — including 2,780 listed buildings. Progress has been steady but is slowing as funding pressures grow.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/heritage-at-risk',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Much of Britain's Heritage Is at Risk of Being Lost?",
    description: "4,848 historic buildings and sites are on Historic England's Heritage at Risk register — including 2,780 listed buildings. Progress has been steady but is slowing as funding pressures grow.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/heritage-at-risk',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

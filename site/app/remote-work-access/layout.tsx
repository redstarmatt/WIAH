import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Who Gets to Work from Home?",
  description: "43% of UK workers can work remotely, but there is a sharp occupational divide. Remote-eligible roles pay £13,000 more per year on average. Workers without remote access are disproportionately younger, lower-paid and from ethnic minority backgrounds.",
  openGraph: {
    title: "Who Gets to Work from Home?",
    description: "43% of UK workers can work remotely, but there is a sharp occupational divide. Remote-eligible roles pay £13,000 more per year on average. Workers without remote access are disproportionately younger, lower-paid and from ethnic minority backgrounds.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/remote-work-access',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Who Gets to Work from Home?",
    description: "43% of UK workers can work remotely, but there is a sharp occupational divide. Remote-eligible roles pay £13,000 more per year on average. Workers without remote access are disproportionately younger, lower-paid and from ethnic minority backgrounds.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/remote-work-access',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

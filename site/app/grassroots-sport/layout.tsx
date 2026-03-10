import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Are Grassroots Sports Clubs Disappearing?",
  description: "An estimated 4,800 amateur sports clubs have closed in England since 2010. Council investment in sport and leisure has been cut 38% in real terms. The pipeline from street to elite sport is breaking down.",
  openGraph: {
    title: "Are Grassroots Sports Clubs Disappearing?",
    description: "An estimated 4,800 amateur sports clubs have closed in England since 2010. Council investment in sport and leisure has been cut 38% in real terms. The pipeline from street to elite sport is breaking down.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/grassroots-sport',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Are Grassroots Sports Clubs Disappearing?",
    description: "An estimated 4,800 amateur sports clubs have closed in England since 2010. Council investment in sport and leisure has been cut 38% in real terms. The pipeline from street to elite sport is breaking down.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/grassroots-sport',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

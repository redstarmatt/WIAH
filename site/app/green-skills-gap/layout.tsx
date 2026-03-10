import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Can Britain Train Enough Green Workers for Net Zero?",
  description: "The green jobs vacancy rate is 6.8% — twice the economy average. An estimated 4.8 million workers will need reskilling for net zero by 2030. Training provision is far below what is needed.",
  openGraph: {
    title: "Can Britain Train Enough Green Workers for Net Zero?",
    description: "The green jobs vacancy rate is 6.8% — twice the economy average. An estimated 4.8 million workers will need reskilling for net zero by 2030. Training provision is far below what is needed.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/green-skills-gap',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Can Britain Train Enough Green Workers for Net Zero?",
    description: "The green jobs vacancy rate is 6.8% — twice the economy average. An estimated 4.8 million workers will need reskilling for net zero by 2030. Training provision is far below what is needed.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/green-skills-gap',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

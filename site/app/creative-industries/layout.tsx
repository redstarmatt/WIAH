import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "What Is Actually Happening to Britain's Creative Industries?",
  description: "The UK's creative industries contribute £116bn to GDP annually and employ 2.4 million people — but the sector faces mounting pressures from AI-generated content threatening copyright, Brexit barriers to touring, and the disappearance of grassroots music venues at a rate of 12 per month.",
  openGraph: {
    title: "What Is Actually Happening to Britain's Creative Industries?",
    description: "The UK's creative industries contribute £116bn to GDP annually and employ 2.4 million people — but the sector faces mounting pressures from AI-generated content threatening copyright, Brexit barriers to touring, and the disappearance of grassroots music venues at a rate of 12 per month.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/creative-industries',
  },
  twitter: {
    card: 'summary_large_image',
    title: "What Is Actually Happening to Britain's Creative Industries?",
    description: "The UK's creative industries contribute £116bn to GDP annually and employ 2.4 million people — but the sector faces mounting pressures from AI-generated content threatening copyright, Brexit barriers to touring, and the disappearance of grassroots music venues at a rate of 12 per month.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/creative-industries',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

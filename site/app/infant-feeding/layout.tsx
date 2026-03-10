import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Many British Babies Are Breastfed?",
  description: "74.5% of babies in England are breastfed at birth, but only 23% continue at six months — far below the WHO recommendation of exclusive breastfeeding to six months. Regional variation is stark, from 58% to 83%.",
  openGraph: {
    title: "How Many British Babies Are Breastfed?",
    description: "74.5% of babies in England are breastfed at birth, but only 23% continue at six months — far below the WHO recommendation of exclusive breastfeeding to six months. Regional variation is stark, from 58% to 83%.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/infant-feeding',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Many British Babies Are Breastfed?",
    description: "74.5% of babies in England are breastfed at birth, but only 23% continue at six months — far below the WHO recommendation of exclusive breastfeeding to six months. Regional variation is stark, from 58% to 83%.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/infant-feeding',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

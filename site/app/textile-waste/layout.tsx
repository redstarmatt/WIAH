import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Britain's Throwaway Fashion Culture Getting Worse?",
  description: "The UK generates 26.8 kg of textile waste per person per year — the highest rate in Europe. Only 35% of clothing is recycled or donated, down from 42% in 2018, as fast fashion produces garments too poor quality to resell.",
  openGraph: {
    title: "Is Britain's Throwaway Fashion Culture Getting Worse?",
    description: "The UK generates 26.8 kg of textile waste per person per year — the highest rate in Europe. Only 35% of clothing is recycled or donated, down from 42% in 2018, as fast fashion produces garments too poor quality to resell.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/textile-waste',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Britain's Throwaway Fashion Culture Getting Worse?",
    description: "The UK generates 26.8 kg of textile waste per person per year — the highest rate in Europe. Only 35% of clothing is recycled or donated, down from 42% in 2018, as fast fashion produces garments too poor quality to resell.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/textile-waste',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

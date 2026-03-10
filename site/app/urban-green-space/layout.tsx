import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Are British Cities Running Out of Green Space?",
  description: "Only 45% of urban areas meet the WHO guideline of one hectare of accessible green space within 300 metres — down from 52% in 2010. Council park budgets have been cut 42% in real terms since 2010, hitting maintenance and park rangers.",
  openGraph: {
    title: "Are British Cities Running Out of Green Space?",
    description: "Only 45% of urban areas meet the WHO guideline of one hectare of accessible green space within 300 metres — down from 52% in 2010. Council park budgets have been cut 42% in real terms since 2010, hitting maintenance and park rangers.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/urban-green-space',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Are British Cities Running Out of Green Space?",
    description: "Only 45% of urban areas meet the WHO guideline of one hectare of accessible green space within 300 metres — down from 52% in 2010. Council park budgets have been cut 42% in real terms since 2010, hitting maintenance and park rangers.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/urban-green-space',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

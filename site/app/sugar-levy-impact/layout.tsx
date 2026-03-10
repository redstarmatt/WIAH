import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Has the Sugar Levy Cut Sugar in Soft Drinks?",
  description: "Sugar content in soft drinks has fallen 35% since the sugar levy baseline, driven largely by reformulation before the levy took effect. But childhood obesity at reception age has continued to rise to 9.5%, showing the levy alone cannot reverse diet trends.",
  openGraph: {
    title: "Has the Sugar Levy Cut Sugar in Soft Drinks?",
    description: "Sugar content in soft drinks has fallen 35% since the sugar levy baseline, driven largely by reformulation before the levy took effect. But childhood obesity at reception age has continued to rise to 9.5%, showing the levy alone cannot reverse diet trends.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/sugar-levy-impact',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Has the Sugar Levy Cut Sugar in Soft Drinks?",
    description: "Sugar content in soft drinks has fallen 35% since the sugar levy baseline, driven largely by reformulation before the levy took effect. But childhood obesity at reception age has continued to rise to 9.5%, showing the levy alone cannot reverse diet trends.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/sugar-levy-impact',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Much Does Economic Crime Cost Britain?",
  description: "Economic crime costs the UK an estimated £8.3 billion a year — fraud alone accounts for 57% of that, and 41% of all crime reported in England and Wales. Prosecution rates remain negligible relative to scale.",
  openGraph: {
    title: "How Much Does Economic Crime Cost Britain?",
    description: "Economic crime costs the UK an estimated £8.3 billion a year — fraud alone accounts for 57% of that, and 41% of all crime reported in England and Wales. Prosecution rates remain negligible relative to scale.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/economic-crime-scale',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Much Does Economic Crime Cost Britain?",
    description: "Economic crime costs the UK an estimated £8.3 billion a year — fraud alone accounts for 57% of that, and 41% of all crime reported in England and Wales. Prosecution rates remain negligible relative to scale.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/economic-crime-scale',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

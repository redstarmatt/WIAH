import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "What Has Happened to Youth Clubs?",
  description: "An estimated 4,500 youth centres have closed in England since 2010, as local authority youth services were cut 73% in real terms. Only 1.3 million young people now engage in structured youth work, down from 2.7 million.",
  openGraph: {
    title: "What Has Happened to Youth Clubs?",
    description: "An estimated 4,500 youth centres have closed in England since 2010, as local authority youth services were cut 73% in real terms. Only 1.3 million young people now engage in structured youth work, down from 2.7 million.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/youth-club-closures',
  },
  twitter: {
    card: 'summary_large_image',
    title: "What Has Happened to Youth Clubs?",
    description: "An estimated 4,500 youth centres have closed in England since 2010, as local authority youth services were cut 73% in real terms. Only 1.3 million young people now engage in structured youth work, down from 2.7 million.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/youth-club-closures',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

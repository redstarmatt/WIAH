import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Britain's Railway Actually Working?",
  description: "UK data and statistics on is britain's railway actually working?. What is actually happening?",
  openGraph: {
    title: "Is Britain's Railway Actually Working?",
    description: "UK data and statistics on is britain's railway actually working?. What is actually happening?",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/rail',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Britain's Railway Actually Working?",
    description: "UK data and statistics on is britain's railway actually working?. What is actually happening?",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/rail',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

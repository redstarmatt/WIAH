import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is British Rail Still Too Expensive?",
  description: "UK rail fares are 8% higher in real terms than in 2010. Train travel costs 31p per mile on average — nearly twice the 17p per mile cost of driving. High fares discourage modal shift and embed car dependency.",
  openGraph: {
    title: "Is British Rail Still Too Expensive?",
    description: "UK rail fares are 8% higher in real terms than in 2010. Train travel costs 31p per mile on average — nearly twice the 17p per mile cost of driving. High fares discourage modal shift and embed car dependency.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/rail-fares',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is British Rail Still Too Expensive?",
    description: "UK rail fares are 8% higher in real terms than in 2010. Train travel costs 31p per mile on average — nearly twice the 17p per mile cost of driving. High fares discourage modal shift and embed car dependency.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/rail-fares',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

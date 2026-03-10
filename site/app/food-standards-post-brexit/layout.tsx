import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Has Brexit Weakened UK Food Standards?",
  description: "The Food Standards Agency budget has fallen 19% in real terms since 2010, leaving fewer inspectors to manage post-Brexit border controls. Only 1.3% of imported food consignments are checked — against 15-50% in the EU.",
  openGraph: {
    title: "Has Brexit Weakened UK Food Standards?",
    description: "The Food Standards Agency budget has fallen 19% in real terms since 2010, leaving fewer inspectors to manage post-Brexit border controls. Only 1.3% of imported food consignments are checked — against 15-50% in the EU.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/food-standards-post-brexit',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Has Brexit Weakened UK Food Standards?",
    description: "The Food Standards Agency budget has fallen 19% in real terms since 2010, leaving fewer inspectors to manage post-Brexit border controls. Only 1.3% of imported food consignments are checked — against 15-50% in the EU.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/food-standards-post-brexit',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

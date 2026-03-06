import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Cohabiting Couples Actually Protected by Law?',
  description: "3.6 million cohabiting couples have few automatic legal protections, yet 51% mistakenly believe in &lsquo;common law marriage&rsquo; rights that don't exist.",
  openGraph: {
    title: 'Are Cohabiting Couples Actually Protected by Law?',
    description: "3.6 million cohabiting couples have few automatic legal protections, yet 51% mistakenly believe in &lsquo;common law marriage&rsquo; rights that don't exist.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/cohabitation-rights-gap',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Cohabiting Couples Actually Protected by Law?',
    description: "3.6 million cohabiting couples have few automatic legal protections, yet 51% mistakenly believe in &lsquo;common law marriage&rsquo; rights that don't exist.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/cohabitation-rights-gap',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

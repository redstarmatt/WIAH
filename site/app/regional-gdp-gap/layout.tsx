import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Unequal Are Britain's Regional Economies?',
  description: 'London's GDP per head is £67,500 — three times higher than the North East at £22,100 — the widest regional divide of any comparable economy.',
  openGraph: {
    title: 'How Unequal Are Britain's Regional Economies?',
    description: 'London's GDP per head is £67,500 — three times higher than the North East at £22,100 — the widest regional divide of any comparable economy.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/regional-gdp-gap',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Unequal Are Britain's Regional Economies?',
    description: 'London's GDP per head is £67,500 — three times higher than the North East at £22,100 — the widest regional divide of any comparable economy.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/regional-gdp-gap',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

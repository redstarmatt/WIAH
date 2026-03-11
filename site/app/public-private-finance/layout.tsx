import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `What Did PFI Contracts Actually Cost?`,
  description: 'The £42bn outstanding in PFI and PF2 repayments represents 3.2 times the original capital value of the projects. NHS trusts are paying an estimated £2.1bn/year in legacy PFI charges.',
  openGraph: {
    title: `What Did PFI Contracts Actually Cost?`,
    description: 'The £42bn outstanding in PFI and PF2 repayments represents 3.2 times the original capital value of the projects. NHS trusts are paying an estimated £2.1bn/year in legacy PFI charges.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/public-private-finance',
  },
  twitter: {
    card: 'summary_large_image',
    title: `What Did PFI Contracts Actually Cost?`,
    description: 'The £42bn outstanding in PFI and PF2 repayments represents 3.2 times the original capital value of the projects. NHS trusts are paying an estimated £2.1bn/year in legacy PFI charges.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/public-private-finance',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

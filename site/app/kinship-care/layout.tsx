import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Who Steps In When Parents Can't?",
  description: 'An estimated 162,000 children in the UK are being raised by grandparents, aunts, uncles, and other relatives — yet 69% of kinship carers receive no financial support from their local authority. The number has risen 26% since 2019, driven by rising child protection referrals and a severe shortage of foster carers.',
  openGraph: {
    title: "Who Steps In When Parents Can't?",
    description: 'An estimated 162,000 children in the UK are being raised by grandparents, aunts, uncles, and other relatives — yet 69% of kinship carers receive no financial support from their local authority. The number has risen 26% since 2019, driven by rising child protection referrals and a severe shortage of foster carers.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/kinship-care',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Who Steps In When Parents Can't?",
    description: 'An estimated 162,000 children in the UK are being raised by grandparents, aunts, uncles, and other relatives — yet 69% of kinship carers receive no financial support from their local authority. The number has risen 26% since 2019, driven by rising child protection referrals and a severe shortage of foster carers.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/kinship-care',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

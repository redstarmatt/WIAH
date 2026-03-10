import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Many Households Are Drowning in Debt?",
  description: "8.9% of households now carry unsecured debt worth more than 40% of their income — up from 6.1% in 2019. Credit card balances hit £72 billion in 2024 as high interest rates compounded cost-of-living pressures.",
  openGraph: {
    title: "How Many Households Are Drowning in Debt?",
    description: "8.9% of households now carry unsecured debt worth more than 40% of their income — up from 6.1% in 2019. Credit card balances hit £72 billion in 2024 as high interest rates compounded cost-of-living pressures.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/consumer-credit-stress',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Many Households Are Drowning in Debt?",
    description: "8.9% of households now carry unsecured debt worth more than 40% of their income — up from 6.1% in 2019. Credit card balances hit £72 billion in 2024 as high interest rates compounded cost-of-living pressures.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/consumer-credit-stress',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

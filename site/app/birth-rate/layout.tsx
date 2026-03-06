import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why are fewer babies being born in Britain?',
  description: `The UK's total fertility rate fell to 1.44 in 2023 — the lowest since records began in 1938, and well below the 2.1 replacement level. Scotland's rate is just 1.33. Childcare costs, housing unaffordability, and economic insecurity are cited as key drivers.`,
  openGraph: {
    title: 'Why are fewer babies being born in Britain?',
    description: `The UK's total fertility rate fell to 1.44 in 2023 — the lowest since records began in 1938, and well below the 2.1 replacement level. Scotland's rate is just 1.33. Childcare costs, housing unaffordability, and economic insecurity are cited as key drivers.`,
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/birth-rate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why are fewer babies being born in Britain?',
    description: `The UK's total fertility rate fell to 1.44 in 2023 — the lowest since records began in 1938, and well below the 2.1 replacement level. Scotland's rate is just 1.33. Childcare costs, housing unaffordability, and economic insecurity are cited as key drivers.`,
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/birth-rate',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

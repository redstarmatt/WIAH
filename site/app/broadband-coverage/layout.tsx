import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Who Still Can't Get Decent Broadband?",
  description: "Full-fibre broadband now covers 70% of UK premises \u2014 up from 10% in 2020. But 3.5 million mainly rural premises still can't access target speeds.",
  openGraph: {
    title: "Who Still Can't Get Decent Broadband?",
    description: "Full-fibre broadband now covers 70% of UK premises \u2014 up from 10% in 2020. But 3.5 million mainly rural premises still can't access target speeds.",
    type: 'article',
    url: "https://whatisactuallyhappening.uk/broadband-coverage",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Who Still Can't Get Decent Broadband?",
    description: "Full-fibre broadband now covers 70% of UK premises \u2014 up from 10% in 2020. But 3.5 million mainly rural premises still can't access target speeds.",
  },
  alternates: {
    canonical: "https://whatisactuallyhappening.uk/broadband-coverage",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>({children})</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Did Britain Stop Building the World's Cheapest Energy?",
  description: "A de facto ban on onshore wind in England between 2015 and 2023 cost an estimated £13bn in higher energy bills over 8 years. England's capacity flatlined while Scotland and Wales continued to build. The ban was lifted in 2023 but the planning pipeline remains slow to translate into turbines.",
  openGraph: {
    title: "Why Did Britain Stop Building the World's Cheapest Energy?",
    description: "A de facto ban on onshore wind in England between 2015 and 2023 cost an estimated £13bn in higher energy bills over 8 years. England's capacity flatlined while Scotland and Wales continued to build. The ban was lifted in 2023 but the planning pipeline remains slow to translate into turbines.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/onshore-wind',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Did Britain Stop Building the World's Cheapest Energy?",
    description: "A de facto ban on onshore wind in England between 2015 and 2023 cost an estimated £13bn in higher energy bills over 8 years. England's capacity flatlined while Scotland and Wales continued to build. The ban was lifted in 2023 but the planning pipeline remains slow to translate into turbines.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/onshore-wind',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

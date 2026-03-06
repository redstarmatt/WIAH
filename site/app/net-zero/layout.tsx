import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain Actually Decarbonising?',
  description: 'UK greenhouse gas emissions fell to 371 million tonnes CO2-equivalent in 2024 &mdash; the lowest level since 1872. The UK has cut emissions 53% since 1990 while GDP grew 84%. Renewables generated 50.8% of UK electricity in 2024 &mdash; the first time they have crossed 50%.',
  openGraph: {
    title: 'Is Britain Actually Decarbonising?',
    description: 'UK greenhouse gas emissions fell to 371 million tonnes CO2-equivalent in 2024 &mdash; the lowest level since 1872. The UK has cut emissions 53% since 1990 while GDP grew 84%. Renewables generated 50.8% of UK electricity in 2024 &mdash; the first time they have crossed 50%.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/net-zero',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain Actually Decarbonising?',
    description: 'UK greenhouse gas emissions fell to 371 million tonnes CO2-equivalent in 2024 &mdash; the lowest level since 1872. The UK has cut emissions 53% since 1990 while GDP grew 84%. Renewables generated 50.8% of UK electricity in 2024 &mdash; the first time they have crossed 50%.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/net-zero',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

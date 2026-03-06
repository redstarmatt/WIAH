import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain Actually Getting Noisier?',
  description: "An estimated 9.7 million people in England are exposed to road traffic noise above the WHO's recommended safety threshold. Noise complaints to local authorities peaked at 435,000 in 2021 and remain well above pre-pandemic levels.",
  openGraph: {
    title: 'Is Britain Actually Getting Noisier?',
    description: "An estimated 9.7 million people in England are exposed to road traffic noise above the WHO's recommended safety threshold. Noise complaints to local authorities peaked at 435,000 in 2021 and remain well above pre-pandemic levels.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/noise-pollution',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain Actually Getting Noisier?',
    description: "An estimated 9.7 million people in England are exposed to road traffic noise above the WHO's recommended safety threshold. Noise complaints to local authorities peaked at 435,000 in 2021 and remain well above pre-pandemic levels.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/noise-pollution',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

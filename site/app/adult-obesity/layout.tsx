import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Adult Obesity Still Getting Worse?",
  description: "29.5% of adults in England are now obese — the highest rate on record. Severe obesity has risen from 2.4% in 2010 to 4.1% today, with the sharpest increases in the most deprived areas.",
  openGraph: {
    title: "Is Adult Obesity Still Getting Worse?",
    description: "29.5% of adults in England are now obese — the highest rate on record. Severe obesity has risen from 2.4% in 2010 to 4.1% today, with the sharpest increases in the most deprived areas.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/adult-obesity',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Adult Obesity Still Getting Worse?",
    description: "29.5% of adults in England are now obese — the highest rate on record. Severe obesity has risen from 2.4% in 2010 to 4.1% today, with the sharpest increases in the most deprived areas.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/adult-obesity',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

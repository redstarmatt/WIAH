import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Are Liver Disease Deaths Rising?',
  description: 'Liver disease deaths have risen by over 40% since 2001, driven by alcohol, obesity, and hepatitis, making the UK an outlier in Western Europe.',
  openGraph: {
    title: 'Why Are Liver Disease Deaths Rising?',
    description: 'Liver disease deaths have risen by over 40% since 2001, driven by alcohol, obesity, and hepatitis, making the UK an outlier in Western Europe.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/liver-disease-deaths',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Are Liver Disease Deaths Rising?',
    description: 'Liver disease deaths have risen by over 40% since 2001, driven by alcohol, obesity, and hepatitis, making the UK an outlier in Western Europe.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/liver-disease-deaths',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

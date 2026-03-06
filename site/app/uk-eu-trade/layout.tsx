import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Has Brexit Done to British Trade?',
  description: 'UK goods exports to the EU fell by an estimated 15% relative to trend after Brexit, while the administrative burden has added over 1.8 million forms a month.',
  openGraph: {
    title: 'What Has Brexit Done to British Trade?',
    description: 'UK goods exports to the EU fell by an estimated 15% relative to trend after Brexit, while the administrative burden has added over 1.8 million forms a month.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/uk-eu-trade',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Has Brexit Done to British Trade?',
    description: 'UK goods exports to the EU fell by an estimated 15% relative to trend after Brexit, while the administrative burden has added over 1.8 million forms a month.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/uk-eu-trade',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

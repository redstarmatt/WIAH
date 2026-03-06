import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain Treating Its Addiction Crisis?',
  description: 'Drug and alcohol treatment funding fell 36&percnt; in real terms between 2013 and 2020, contributing to 4,907 drug poisoning deaths in 2022 — the highest recorded rate in Europe — while 289,000 people remain in treatment, down from 311,000 a decade ago.',
  openGraph: {
    title: 'Is Britain Treating Its Addiction Crisis?',
    description: 'Drug and alcohol treatment funding fell 36&percnt; in real terms between 2013 and 2020, contributing to 4,907 drug poisoning deaths in 2022 — the highest recorded rate in Europe — while 289,000 people remain in treatment, down from 311,000 a decade ago.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/addiction-services',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain Treating Its Addiction Crisis?',
    description: 'Drug and alcohol treatment funding fell 36&percnt; in real terms between 2013 and 2020, contributing to 4,907 drug poisoning deaths in 2022 — the highest recorded rate in Europe — while 289,000 people remain in treatment, down from 311,000 a decade ago.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/addiction-services',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

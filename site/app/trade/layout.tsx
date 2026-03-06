import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Has Brexit Actually Changed British Trade?',
  description: 'UK goods exports to the EU remain 7% below pre-Brexit trend in volume terms. The OBR estimates Brexit has reduced UK trade intensity by 15%. The UK runs a £157bn goods deficit but a £145bn services surplus. Food exports to the EU fell 22% in 2021 and have not recovered.',
  openGraph: {
    title: 'Has Brexit Actually Changed British Trade?',
    description: 'UK goods exports to the EU remain 7% below pre-Brexit trend in volume terms. The OBR estimates Brexit has reduced UK trade intensity by 15%. The UK runs a £157bn goods deficit but a £145bn services surplus. Food exports to the EU fell 22% in 2021 and have not recovered.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/trade',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Has Brexit Actually Changed British Trade?',
    description: 'UK goods exports to the EU remain 7% below pre-Brexit trend in volume terms. The OBR estimates Brexit has reduced UK trade intensity by 15%. The UK runs a £157bn goods deficit but a £145bn services surplus. Food exports to the EU fell 22% in 2021 and have not recovered.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/trade',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

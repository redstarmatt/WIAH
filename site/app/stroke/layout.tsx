import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can You Get the Right Treatment in Time?',
  description: 'Stroke kills 35,000 people a year in England and is the leading cause of adult disability. Only 11% of ischaemic stroke patients receive clot-busting thrombolysis, and fewer than 4% get thrombectomy — despite evidence it transforms outcomes.',
  openGraph: {
    title: 'Can You Get the Right Treatment in Time?',
    description: 'Stroke kills 35,000 people a year in England and is the leading cause of adult disability. Only 11% of ischaemic stroke patients receive clot-busting thrombolysis, and fewer than 4% get thrombectomy — despite evidence it transforms outcomes.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/stroke',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can You Get the Right Treatment in Time?',
    description: 'Stroke kills 35,000 people a year in England and is the leading cause of adult disability. Only 11% of ischaemic stroke patients receive clot-busting thrombolysis, and fewer than 4% get thrombectomy — despite evidence it transforms outcomes.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/stroke',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Are NHS Medical Errors Costing?',
  description: "NHS negligence liability has reached £83 billion — more than the NHS's entire annual budget.",
  openGraph: {
    title: 'What Are NHS Medical Errors Costing?',
    description: "NHS negligence liability has reached £83 billion — more than the NHS's entire annual budget.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/clinical-negligence-costs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Are NHS Medical Errors Costing?',
    description: "NHS negligence liability has reached £83 billion — more than the NHS's entire annual budget.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/clinical-negligence-costs',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

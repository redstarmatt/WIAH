import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Is the NHS Treating Fewer Patients With More Staff?',
  description: 'NHS productivity remains 3–4% below its pre-COVID level despite a 17% increase in staff numbers since 2019. Output per worker has fallen by nearly 10% since 2014, creating an efficiency gap that costs the equivalent of tens of thousands of lost operations each year.',
  openGraph: {
    title: 'Why Is the NHS Treating Fewer Patients With More Staff?',
    description: 'NHS productivity remains 3–4% below its pre-COVID level despite a 17% increase in staff numbers since 2019. Output per worker has fallen by nearly 10% since 2014, creating an efficiency gap that costs the equivalent of tens of thousands of lost operations each year.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-productivity',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Is the NHS Treating Fewer Patients With More Staff?',
    description: 'NHS productivity remains 3–4% below its pre-COVID level despite a 17% increase in staff numbers since 2019. Output per worker has fallen by nearly 10% since 2014, creating an efficiency gap that costs the equivalent of tens of thousands of lost operations each year.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-productivity',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

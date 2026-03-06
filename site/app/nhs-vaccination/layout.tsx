import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Vaccine Uptake Rates High Enough to Prevent Outbreaks?',
  description: 'MMR (measles, mumps, rubella) vaccine uptake in 2-year-olds fell to 89% in 2023 — below the 95% herd immunity threshold for the first time since 2011. The UK lost its WHO measles-free status in 2019. Childhood immunisation rates have fallen across all vaccines since 2013. A measles outbreak in Birmingham in early 2024 infected over 300 children.',
  openGraph: {
    title: 'Are Vaccine Uptake Rates High Enough to Prevent Outbreaks?',
    description: 'MMR (measles, mumps, rubella) vaccine uptake in 2-year-olds fell to 89% in 2023 — below the 95% herd immunity threshold for the first time since 2011. The UK lost its WHO measles-free status in 2019. Childhood immunisation rates have fallen across all vaccines since 2013. A measles outbreak in Birmingham in early 2024 infected over 300 children.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-vaccination',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Vaccine Uptake Rates High Enough to Prevent Outbreaks?',
    description: 'MMR (measles, mumps, rubella) vaccine uptake in 2-year-olds fell to 89% in 2023 — below the 95% herd immunity threshold for the first time since 2011. The UK lost its WHO measles-free status in 2019. Childhood immunisation rates have fallen across all vaccines since 2013. A measles outbreak in Birmingham in early 2024 infected over 300 children.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-vaccination',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

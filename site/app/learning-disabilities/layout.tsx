import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are People With Learning Disabilities Getting the Care They Need?',
  description: 'People with learning disabilities die on average 23 years younger than the general population. Nearly 2,000 remain in inpatient settings despite a decade-old promise to move them into the community. Only 69% receive their recommended annual health check.',
  openGraph: {
    title: 'Are People With Learning Disabilities Getting the Care They Need?',
    description: 'People with learning disabilities die on average 23 years younger than the general population. Nearly 2,000 remain in inpatient settings despite a decade-old promise to move them into the community. Only 69% receive their recommended annual health check.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/learning-disabilities',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are People With Learning Disabilities Getting the Care They Need?',
    description: 'People with learning disabilities die on average 23 years younger than the general population. Nearly 2,000 remain in inpatient settings despite a decade-old promise to move them into the community. Only 69% receive their recommended annual health check.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/learning-disabilities',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

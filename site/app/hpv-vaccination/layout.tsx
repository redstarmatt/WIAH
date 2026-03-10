import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is HPV Vaccination Protecting Britain's Young People?",
  description: "84% of girls and 75% of boys complete the HPV vaccination course in England. The programme, extended to boys in 2019, is expected to eliminate most cervical cancers in vaccinated cohorts by the 2040s.",
  openGraph: {
    title: "Is HPV Vaccination Protecting Britain's Young People?",
    description: "84% of girls and 75% of boys complete the HPV vaccination course in England. The programme, extended to boys in 2019, is expected to eliminate most cervical cancers in vaccinated cohorts by the 2040s.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/hpv-vaccination',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is HPV Vaccination Protecting Britain's Young People?",
    description: "84% of girls and 75% of boys complete the HPV vaccination course in England. The programme, extended to boys in 2019, is expected to eliminate most cervical cancers in vaccinated cohorts by the 2040s.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/hpv-vaccination',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

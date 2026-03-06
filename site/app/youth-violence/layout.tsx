import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Young People Safer Than They Were?',
  description: 'Hospital admissions for assault among under-25s reached 7,100 in 2024, the highest level since 2012. Serious youth violence offences have risen 57&percnt; in a decade, concentrated in a small number of urban areas where youth services have been cut most deeply.',
  openGraph: {
    title: 'Are Young People Safer Than They Were?',
    description: 'Hospital admissions for assault among under-25s reached 7,100 in 2024, the highest level since 2012. Serious youth violence offences have risen 57&percnt; in a decade, concentrated in a small number of urban areas where youth services have been cut most deeply.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/youth-violence',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Young People Safer Than They Were?',
    description: 'Hospital admissions for assault among under-25s reached 7,100 in 2024, the highest level since 2012. Serious youth violence offences have risen 57&percnt; in a decade, concentrated in a small number of urban areas where youth services have been cut most deeply.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/youth-violence',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many Wrongful Convictions Go Uncorrected?',
  description: 'The Criminal Cases Review Commission receives around 1,400 applications per year from people claiming wrongful conviction. It refers just 2&percnt; to the Court of Appeal — roughly 30 cases. The true scale of miscarriages of justice in England and Wales is unknown, but the system for correcting them is slow, under-resourced, and narrowly drawn.',
  openGraph: {
    title: 'How Many Wrongful Convictions Go Uncorrected?',
    description: 'The Criminal Cases Review Commission receives around 1,400 applications per year from people claiming wrongful conviction. It refers just 2&percnt; to the Court of Appeal — roughly 30 cases. The true scale of miscarriages of justice in England and Wales is unknown, but the system for correcting them is slow, under-resourced, and narrowly drawn.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/miscarriages-of-justice',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many Wrongful Convictions Go Uncorrected?',
    description: 'The Criminal Cases Review Commission receives around 1,400 applications per year from people claiming wrongful conviction. It refers just 2&percnt; to the Court of Appeal — roughly 30 cases. The true scale of miscarriages of justice in England and Wales is unknown, but the system for correcting them is slow, under-resourced, and narrowly drawn.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/miscarriages-of-justice',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

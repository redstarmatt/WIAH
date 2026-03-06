import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How well does the criminal justice system respond to violence against women?',
  description: 'The charge rate for rape in England and Wales is just 3.3%, meaning fewer than 1 in 30 reported rapes results in a charge.',
  openGraph: {
    title: 'How well does the criminal justice system respond to violence against women?',
    description: 'The charge rate for rape in England and Wales is just 3.3%, meaning fewer than 1 in 30 reported rapes results in a charge.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/misogyny-policing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How well does the criminal justice system respond to violence against women?',
    description: 'The charge rate for rape in England and Wales is just 3.3%, meaning fewer than 1 in 30 reported rapes results in a charge.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/misogyny-policing',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

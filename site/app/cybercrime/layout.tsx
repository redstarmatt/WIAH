import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can the Law Keep Up with Cybercrime?',
  description: 'The Crime Survey estimates 1.9 million computer misuse offences annually in England and Wales, yet prosecutions number fewer than 900 per year. Ransomware attacks on NHS trusts, councils, and businesses have surged, while specialist cyber policing units remain drastically underfunded.',
  openGraph: {
    title: 'Can the Law Keep Up with Cybercrime?',
    description: 'The Crime Survey estimates 1.9 million computer misuse offences annually in England and Wales, yet prosecutions number fewer than 900 per year. Ransomware attacks on NHS trusts, councils, and businesses have surged, while specialist cyber policing units remain drastically underfunded.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/cybercrime',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can the Law Keep Up with Cybercrime?',
    description: 'The Crime Survey estimates 1.9 million computer misuse offences annually in England and Wales, yet prosecutions number fewer than 900 per year. Ransomware attacks on NHS trusts, councils, and businesses have surged, while specialist cyber policing units remain drastically underfunded.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/cybercrime',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

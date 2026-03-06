import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Safe Are Our Hospitals From Infection?',
  description: 'C.difficile cases have risen for two consecutive years after decades of decline, and an estimated 300,000 patients acquire healthcare-associated infections annually &mdash; a patient safety challenge that the NHS must not lose sight of after years of hard-won progress.',
  openGraph: {
    title: 'How Safe Are Our Hospitals From Infection?',
    description: 'C.difficile cases have risen for two consecutive years after decades of decline, and an estimated 300,000 patients acquire healthcare-associated infections annually &mdash; a patient safety challenge that the NHS must not lose sight of after years of hard-won progress.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/hospital-infections',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Safe Are Our Hospitals From Infection?',
    description: 'C.difficile cases have risen for two consecutive years after decades of decline, and an estimated 300,000 patients acquire healthcare-associated infections annually &mdash; a patient safety challenge that the NHS must not lose sight of after years of hard-won progress.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/hospital-infections',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Is Stalking So Rarely Prosecuted?',
  description: 'Police recorded 131,000 stalking offences in 2024 — a 33-fold increase from 2015 — but the charge rate has fallen to just 2.5&percnt;. Stalking remains one of the most under-enforced crimes in England and Wales, with victims routinely reporting that their cases are not taken seriously.',
  openGraph: {
    title: 'Why Is Stalking So Rarely Prosecuted?',
    description: 'Police recorded 131,000 stalking offences in 2024 — a 33-fold increase from 2015 — but the charge rate has fallen to just 2.5&percnt;. Stalking remains one of the most under-enforced crimes in England and Wales, with victims routinely reporting that their cases are not taken seriously.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/stalking',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Is Stalking So Rarely Prosecuted?',
    description: 'Police recorded 131,000 stalking offences in 2024 — a 33-fold increase from 2015 — but the charge rate has fallen to just 2.5&percnt;. Stalking remains one of the most under-enforced crimes in England and Wales, with victims routinely reporting that their cases are not taken seriously.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/stalking',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

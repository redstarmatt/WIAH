import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Drink Driving Still Killing People?',
  description: '280 people died in drink-drive collisions in 2022 — the same number as a decade ago, despite stricter enforcement and campaigning.',
  openGraph: {
    title: 'Is Drink Driving Still Killing People?',
    description: '280 people died in drink-drive collisions in 2022 — the same number as a decade ago, despite stricter enforcement and campaigning.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/drink-drive-deaths',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Drink Driving Still Killing People?',
    description: '280 people died in drink-drive collisions in 2022 — the same number as a decade ago, despite stricter enforcement and campaigning.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/drink-drive-deaths',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

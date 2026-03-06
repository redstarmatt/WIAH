import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Car Insurance Becoming Unaffordable?',
  description: 'Average UK car insurance premiums rose 58% in 2023 to £924 — with young drivers in cities facing premiums over £2,800 — leaving some workers unable to afford to drive to work.',
  openGraph: {
    title: 'Is Car Insurance Becoming Unaffordable?',
    description: 'Average UK car insurance premiums rose 58% in 2023 to £924 — with young drivers in cities facing premiums over £2,800 — leaving some workers unable to afford to drive to work.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/car-insurance-poverty',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Car Insurance Becoming Unaffordable?',
    description: 'Average UK car insurance premiums rose 58% in 2023 to £924 — with young drivers in cities facing premiums over £2,800 — leaving some workers unable to afford to drive to work.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/car-insurance-poverty',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

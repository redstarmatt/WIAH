import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Is Actually Happening at the Border?',
  description: '36,816 people crossed the English Channel in small boats in 2024, up 25&percnt; on 2023. The asylum decision backlog stood at 98,600 cases at the end of 2025, down from a peak of 175,400 but still more than double pre-pandemic levels. Returns of failed asylum seekers have fallen to historic lows.',
  openGraph: {
    title: 'What Is Actually Happening at the Border?',
    description: '36,816 people crossed the English Channel in small boats in 2024, up 25&percnt; on 2023. The asylum decision backlog stood at 98,600 cases at the end of 2025, down from a peak of 175,400 but still more than double pre-pandemic levels. Returns of failed asylum seekers have fallen to historic lows.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/border-security',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Actually Happening at the Border?',
    description: '36,816 people crossed the English Channel in small boats in 2024, up 25&percnt; on 2023. The asylum decision backlog stood at 98,600 cases at the end of 2025, down from a peak of 175,400 but still more than double pre-pandemic levels. Returns of failed asylum seekers have fallen to historic lows.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/border-security',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many of Those Years Are Actually Healthy?',
  description: 'Men can expect 62.9 healthy years; women 63.4. Both have barely moved in 15 years. Men spend 16 years in poor health, women 19.5 years. The gap between the most and least deprived is 19 years of healthy life.',
  openGraph: {
    title: 'How Many of Those Years Are Actually Healthy?',
    description: 'Men can expect 62.9 healthy years; women 63.4. Both have barely moved in 15 years. Men spend 16 years in poor health, women 19.5 years. The gap between the most and least deprived is 19 years of healthy life.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/healthy-life-expectancy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many of Those Years Are Actually Healthy?',
    description: 'Men can expect 62.9 healthy years; women 63.4. Both have barely moved in 15 years. Men spend 16 years in poor health, women 19.5 years. The gap between the most and least deprived is 19 years of healthy life.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/healthy-life-expectancy',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

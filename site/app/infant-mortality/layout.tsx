import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Do More Babies Die in Britain Than in Comparable Countries?',
  description: '3.6 babies per 1,000 live births die in England and Wales — worse than France, Germany, Sweden, and Japan. Babies born in the most deprived areas are 2.5 times more likely to die in their first year than those in the least deprived. 3,000 stillbirths occur every year. The UK infant mortality rate has stalled since 2014 while comparator countries continue to improve.',
  openGraph: {
    title: 'Why Do More Babies Die in Britain Than in Comparable Countries?',
    description: '3.6 babies per 1,000 live births die in England and Wales — worse than France, Germany, Sweden, and Japan. Babies born in the most deprived areas are 2.5 times more likely to die in their first year than those in the least deprived. 3,000 stillbirths occur every year. The UK infant mortality rate has stalled since 2014 while comparator countries continue to improve.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/infant-mortality',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Do More Babies Die in Britain Than in Comparable Countries?',
    description: '3.6 babies per 1,000 live births die in England and Wales — worse than France, Germany, Sweden, and Japan. Babies born in the most deprived areas are 2.5 times more likely to die in their first year than those in the least deprived. 3,000 stillbirths occur every year. The UK infant mortality rate has stalled since 2014 while comparator countries continue to improve.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/infant-mortality',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

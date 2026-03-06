import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain Actually Switching to Electric Cars?',
  description: 'EVs took 16.5&percnt; of new car sales in 2023, but public charging infrastructure is insufficient &mdash; just 1 charger per 54 EVs, against a target of 1 per 10. The 2030 petrol ban may slip to 2035, and range anxiety and upfront cost remain the top barriers for most buyers.',
  openGraph: {
    title: 'Is Britain Actually Switching to Electric Cars?',
    description: 'EVs took 16.5&percnt; of new car sales in 2023, but public charging infrastructure is insufficient &mdash; just 1 charger per 54 EVs, against a target of 1 per 10. The 2030 petrol ban may slip to 2035, and range anxiety and upfront cost remain the top barriers for most buyers.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/electric-vehicles',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain Actually Switching to Electric Cars?',
    description: 'EVs took 16.5&percnt; of new car sales in 2023, but public charging infrastructure is insufficient &mdash; just 1 charger per 54 EVs, against a target of 1 per 10. The 2030 petrol ban may slip to 2035, and range anxiety and upfront cost remain the top barriers for most buyers.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/electric-vehicles',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

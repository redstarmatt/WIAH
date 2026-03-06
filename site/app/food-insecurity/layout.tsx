import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can People Afford to Eat?',
  description: 'Food bank use has risen twelve-fold since 2012, and one in five children now lives in a household that regularly goes without food.',
  openGraph: {
    title: 'Can People Afford to Eat?',
    description: 'Food bank use has risen twelve-fold since 2012, and one in five children now lives in a household that regularly goes without food.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/food-insecurity',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can People Afford to Eat?',
    description: 'Food bank use has risen twelve-fold since 2012, and one in five children now lives in a household that regularly goes without food.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/food-insecurity',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

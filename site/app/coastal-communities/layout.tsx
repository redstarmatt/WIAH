import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Britain&apos;s Coastal Towns Being Left Behind?',
  description: 'Coastal communities in England are among the most economically deprived in the country: average wages are 17% below the national median, and child poverty rates are 10 percentage points higher than inland areas. Many seaside towns that boomed as Victorian holiday resorts have seen three decades of economic decline as tourism shifted abroad. Health outcomes, school performance, and life expectancy all lag the national average.',
  openGraph: {
    title: 'Are Britain&apos;s Coastal Towns Being Left Behind?',
    description: 'Coastal communities in England are among the most economically deprived in the country: average wages are 17% below the national median, and child poverty rates are 10 percentage points higher than inland areas. Many seaside towns that boomed as Victorian holiday resorts have seen three decades of economic decline as tourism shifted abroad. Health outcomes, school performance, and life expectancy all lag the national average.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/coastal-communities',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Britain&apos;s Coastal Towns Being Left Behind?',
    description: 'Coastal communities in England are among the most economically deprived in the country: average wages are 17% below the national median, and child poverty rates are 10 percentage points higher than inland areas. Many seaside towns that boomed as Victorian holiday resorts have seen three decades of economic decline as tourism shifted abroad. Health outcomes, school performance, and life expectancy all lag the national average.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/coastal-communities',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

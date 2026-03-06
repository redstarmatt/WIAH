import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Did Inflation Hit Everyone Equally?',
  description: 'At peak inflation in late 2022, households in the poorest income quintile faced 12.8% inflation — 2.4 percentage points higher than the wealthiest, as food and energy hit harder on low incomes.',
  openGraph: {
    title: 'Did Inflation Hit Everyone Equally?',
    description: 'At peak inflation in late 2022, households in the poorest income quintile faced 12.8% inflation — 2.4 percentage points higher than the wealthiest, as food and energy hit harder on low incomes.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/inflation-by-income',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Did Inflation Hit Everyone Equally?',
    description: 'At peak inflation in late 2022, households in the poorest income quintile faced 12.8% inflation — 2.4 percentage points higher than the wealthiest, as food and energy hit harder on low incomes.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/inflation-by-income',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

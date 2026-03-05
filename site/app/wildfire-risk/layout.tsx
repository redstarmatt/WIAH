import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wildfire Risk',
  description: 'Wildfires burned over 26,000 hectares in England in 2022 a 570% increase on the previous decade s average. The record temperatures of July 2022 saw fires within',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

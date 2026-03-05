import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cycling Infrastructure',
  description: 'Just 2.2% of all journeys in England are made by bike compared with 27% in the Netherlands and the figure has barely moved in a decade despite successive govern',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

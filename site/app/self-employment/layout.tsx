import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Self-Employment',
  description: 'Self-employment peaked at 4.93 million in 2019 then collapsed: 700,000 people left the sector during COVID-19 and have not returned. The self-employed earn 40% ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

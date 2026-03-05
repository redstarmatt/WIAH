import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vocational Pathways',
  description: 'Young people on vocational routes earn 4,200 less than those with equivalent A-levels a gap that fuels the perceived hierarchy between academic and technical ed',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Teacher Shortage',
  description: 'England missed its secondary school teacher recruitment targets for 10 of 17 subjects in 2022/23. The teacher vacancy rate stands at 3.1% the highest since reco',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

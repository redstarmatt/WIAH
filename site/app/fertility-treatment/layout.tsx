import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fertility Treatment',
  description: 'Only 45% of integrated care systems offer the NICE-recommended three cycles of IVF leaving couples paying 5,000 10,000 per cycle out of pocket, with NHS waiting',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

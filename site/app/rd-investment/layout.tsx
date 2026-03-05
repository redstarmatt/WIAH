import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Economy & Work',
  description: 'The UK spent 1.73% of GDP on R&D in 2021 — well below the OECD target of 2.4% and the G7 average of 2.66%. South Korea invests 4.93%. The UK\'s technology indust',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

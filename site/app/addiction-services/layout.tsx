import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Addiction Services',
  description: 'Drug and alcohol treatment funding fell 36% in real terms between 2013 and 2020, contributing to 4,907 drug poisoning deaths in 2022 the highest recorded rate i',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

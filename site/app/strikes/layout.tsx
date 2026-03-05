import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Strikes',
  description: 'The UK experienced the largest wave of industrial action since the 1970s in 2022–23, with 3.75 million working days lost — the highest since 1989 — but the stri',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

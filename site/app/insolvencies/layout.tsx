import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Insolvencies',
  description: '25,158 company insolvencies were registered in England Wales in 2023 the highest since 1993, and 50% higher than the pre-pandemic average. Hospitality and const',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

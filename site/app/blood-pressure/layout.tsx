import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blood Pressure',
  description: 'An estimated 15 million people in England have high blood pressure, but only 7.8 million are diagnosed. Of those diagnosed, just 60% have their blood pressure c',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

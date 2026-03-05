import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weight-Loss Drug Access',
  description: 'Only 35,000 people receive GLP-1 weight-loss drugs on the NHS out of 3.4 million who may be eligible under NICE criteria.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

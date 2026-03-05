import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rough Sleeping',
  description: '3,898 people were counted sleeping rough in England on a single autumn night in 2023 up 27% in a year. The real figure is estimated to be three to five times hi',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

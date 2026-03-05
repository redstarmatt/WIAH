import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Press Freedom',
  description: 'The UK ranks 23rd in the world for press freedom behind Jamaica, Namibia, and Costa Rica. While the ranking has improved from a low of 40th in 2017, structural ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

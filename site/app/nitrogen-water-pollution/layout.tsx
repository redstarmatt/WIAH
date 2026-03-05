import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nitrogen Water Pollution',
  description: '83% of English rivers fail nitrate water quality standards, driven overwhelmingly by agricultural fertiliser runoff.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

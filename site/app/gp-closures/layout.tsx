import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GP Closures',
  description: '1,640 GP practices have closed since 2013. Average practice list sizes have grown from 6,900 to 9,600 patients creating larger, less personal surgeries where co',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

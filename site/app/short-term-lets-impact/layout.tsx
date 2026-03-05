import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Short-Term Lets Impact',
  description: 'Short-term lets have removed an estimated 250,000 homes from the long-term rental market, with coastal communities seeing up to 40% of stock listed on platforms',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

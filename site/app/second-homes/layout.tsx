import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Second Homes',
  description: 'Over 272,000 second homes and 230,000 short-term lets in England concentrated in coastal and rural areas are removing properties from local housing markets. Com',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

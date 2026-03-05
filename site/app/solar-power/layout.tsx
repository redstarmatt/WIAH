import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solar Power',
  description: 'The UK now has 15.8 GW of installed solar enough to power 5 million homes but solar still generates only 5% of annual electricity. The technology is proven and ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

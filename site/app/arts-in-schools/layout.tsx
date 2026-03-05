import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Arts in Schools',
  description: 'GCSE art and design entries have fallen 41% since 2010. Music entries are down 41%, drama down 34%, dance down 44%. The EBacc — which excludes arts — has been t',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

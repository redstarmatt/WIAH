import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regional Inequality',
  description: 'London s economic output per person is 178% of the UK average; the North East produces 65%. This 113-point gap has widened, not narrowed, since 2015 despite suc',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

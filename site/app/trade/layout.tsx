import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trade &amp; Brexit',
  description: 'UK goods exports to the EU remain 7% below pre-Brexit trend in volume terms. The OBR estimates Brexit has reduced UK trade intensity by 15%. The UK runs a 157bn',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

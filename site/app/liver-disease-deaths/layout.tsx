import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liver Disease Deaths',
  description: 'Liver disease deaths have risen by over 40% since 2001, driven by alcohol, obesity, and hepatitis, making the UK an outlier in Western Europe.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

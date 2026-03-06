import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cancer Screening Uptake',
  description: 'Cervical, breast and bowel screening uptake has fallen below the levels needed for effective cancer prevention.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

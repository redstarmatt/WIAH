import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Justice',
  description: 'After peaking in 2023/24, knife crime is now falling. Youth knife offending has declined for six consecutive years. Hospital admissions for knife assaults — the',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

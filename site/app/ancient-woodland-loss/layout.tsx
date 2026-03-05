import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ancient Woodland Loss',
  description: 'Over 1,000 ancient woodland sites are under threat from development, and 700 hectares were lost to HS2 alone — irreplaceable ecosystem lost for good.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

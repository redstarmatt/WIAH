import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Local Government',
  description: 'Local government funding has fallen 32% in real terms since 2010, forcing councils to cut services, raise council tax by 59%, and eight councils have issued Sec',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Public Sector Pay Gap',
  description: 'Public sector pay fell 3.2% below private sector in 2022 in real terms — the widest gap since 2010 — though recent settlements have partially closed the shortfa',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

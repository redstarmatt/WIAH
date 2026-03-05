import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Society',
  description: 'Youth volunteering rates have fallen from 46% to 34% since 2010, reversing a generation of civic investment — though employer-supported programmes show new rout',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

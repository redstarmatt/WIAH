import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marine Environment',
  description: 'Only 36% of the UK s Marine Protected Areas are in favourable condition, and just 49% of assessed fish stocks are being harvested sustainably. Despite designati',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

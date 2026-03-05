import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prison Reentry Support',
  description: '46% of adults reoffend within one year of release. Those released with less than 50 are nearly twice as likely to reoffend.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

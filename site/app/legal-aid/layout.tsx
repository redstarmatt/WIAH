import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal Aid',
  description: 'Legal aid spending fell 36% in real terms between 2010 and 2024. The number of solicitor firms holding legal aid contracts halved from 2,300 to around 1,150 cre',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

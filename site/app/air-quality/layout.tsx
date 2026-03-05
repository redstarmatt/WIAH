import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Air Quality',
  description: 'Air pollution causes an estimated 36,000 premature deaths in the UK each year more than obesity. London breaches WHO annual PM2.5 guidelines at most monitoring ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

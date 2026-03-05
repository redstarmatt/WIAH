import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Miscarriages of Justice',
  description: 'The Criminal Cases Review Commission receives around 1,400 applications per year from people claiming wrongful conviction. It refers just 2% to the Court of App',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

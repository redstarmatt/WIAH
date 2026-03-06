import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Benefits',
  description: '6.78 million people now claim Universal Credit nearly three times the 2018 level. Alongside a surge in PIP recipients and food bank use, Britain s safety net is',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

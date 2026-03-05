import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'County Lines',
  description: 'An estimated 10,000 children are involved in county lines drug dealing across England and Wales. Despite police operations closing hundreds of lines, the model ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

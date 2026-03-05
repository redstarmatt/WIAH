import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Loneliness in Young People',
  description: 'Young adults aged 16-24 report the highest rates of chronic loneliness in the UK, with one in six experiencing it often or always.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

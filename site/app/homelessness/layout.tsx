import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Homelessness',
  description: 'Homelessness in England has reached a record level. In 2023/24, 117,500 households were accepted as homeless by local authorities up 119% since 2012/13. 159,900',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

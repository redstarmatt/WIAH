import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Libraries',
  description: 'England has lost over 770 library branches since 2010 a 17% fall. Book issues have dropped 42%. But visits are recovering post-COVID, and libraries have expande',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

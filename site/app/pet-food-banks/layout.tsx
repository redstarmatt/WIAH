import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pet Poverty',
  description: 'Pet food bank demand has risen 500% since 2020, with an estimated 2 million pet owners struggling to afford veterinary care.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

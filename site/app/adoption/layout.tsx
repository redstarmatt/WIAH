import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adoption',
  description: 'Adoption orders in England have fallen 45% since their 2015 peak, from 5,360 to 2,950 in 2023. Children who are adopted wait an average of 538 days from enterin',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

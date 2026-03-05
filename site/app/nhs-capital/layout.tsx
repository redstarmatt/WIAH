import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHS Capital',
  description: 'The NHS maintenance backlog has tripled from 4.3 billion in 2014 to 13.8 billion in 2024. One in four NHS buildings is rated high-risk for infrastructure failur',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

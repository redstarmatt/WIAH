import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'School Buildings',
  description: 'The Department for Education identified 174 schools across England with RAAC concrete that posed a risk of collapse in 2023. The school capital maintenance back',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transport Cost Poverty',
  description: 'Car-free households in rural areas spend 20% or more of their income on transport — while train fares have risen 54% since 2010 versus 28% wage growth.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

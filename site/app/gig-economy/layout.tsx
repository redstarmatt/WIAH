import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gig Economy',
  description: 'An estimated 4.4 million people work in the gig economy typically earning below minimum wage once costs are deducted with no sick pay, no pension, and no guaran',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

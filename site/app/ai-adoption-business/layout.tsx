import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Adoption in Business',
  description: 'Less than half of large UK businesses use AI and only 1 in 7 small firms have adopted it, leaving Britain trailing peers in productivity gains.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

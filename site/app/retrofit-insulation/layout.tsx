import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Retrofit &amp; Insulation',
  description: 'Only 250,000 homes are retrofitted per year but meeting net zero requires 2 million per year, meaning the programme must scale 8-fold.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

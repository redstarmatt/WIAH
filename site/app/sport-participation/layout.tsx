import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sport Participation',
  description: 'One in four adults in England does fewer than 30 minutes of physical activity per week classified as inactive by the Chief Medical Officer s guidelines. Activit',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

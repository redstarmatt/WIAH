import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'School Meals Quality',
  description: 'Average spend per primary school meal has risen only 15% in a decade while food costs have increased 40%, squeezing nutritional quality.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

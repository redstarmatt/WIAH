import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free School Meals Gap',
  description: '870,000 children live in poverty but aren t eligible for free school meals because their family s income is just above the threshold.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ADHD Waiting Times',
  description: 'NHS England reports rising ADHD referrals with waiting lists exceeding two years in many areas, leaving thousands without diagnosis or support.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

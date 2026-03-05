import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Drug Supply Operations',
  description: 'Thousands of county lines are dismantled each year but drug deaths continue to rise, suggesting supply is replaced faster than it is disrupted.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

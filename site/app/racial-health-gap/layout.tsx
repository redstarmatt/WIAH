import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Racial Health Inequalities',
  description: 'Black women are 3.7 times more likely to die in childbirth than white women. Black people are 4 times more likely to be detained under the Mental Health Act. So',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHS Race Inequality',
  description: 'Black women in the UK are 3.4 times more likely to die in pregnancy or childbirth than white women. Ethnic minority staff make up 24.8% of the NHS workforce but',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

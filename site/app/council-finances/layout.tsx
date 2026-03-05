import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Council Finances',
  description: '12 English councils have issued Section 114 notices (effective bankruptcy) since 2018, including Birmingham, Thurrock, and Woking. The local government funding ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

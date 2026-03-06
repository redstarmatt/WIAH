import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Police Misconduct',
  description: '1,738 police misconduct hearings were held in 2022/23, with 122 officers dismissed. A Black person is 4 times more likely to be stopped and searched than a whit',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

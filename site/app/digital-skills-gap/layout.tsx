import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Economy',
  description: '12.6 million UK adults lack essential digital skills, while 82% of job vacancies now require some digital competency — leaving a third of the working-age popula',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

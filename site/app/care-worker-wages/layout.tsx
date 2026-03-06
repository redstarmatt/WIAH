import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Care Worker Wages',
  description: 'The median care worker earns 10.66 an hour below the Real Living Wage of 12.00 and far below comparable NHS roles. There are 152,000 vacancies in adult social c',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

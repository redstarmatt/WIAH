import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Care',
  description: 'An estimated 500,000 people in England are waiting for a care needs assessment or delayed in receiving a home care package while 132,000 social care vacancies g',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

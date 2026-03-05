import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHS Cancer',
  description: '376,000 new cancer cases are diagnosed in the UK each year. Only 67% of patients begin treatment within 62 days of urgent referral against a 85% target not met ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sexual Health',
  description: 'STI diagnoses have returned to pre-pandemic levels at 432,000 per year, while 40% of sexual health clinics have closed since 2014. Gonorrhoea rates have nearly ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

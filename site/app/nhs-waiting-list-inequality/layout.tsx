import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHS Waiting List Inequality',
  description: 'Patients in the most deprived areas wait on average 20% longer for elective treatment than those in the least deprived.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

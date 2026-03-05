import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'University Funding',
  description: 'Average student loan debt at graduation reached 45,800 in 2022/23. Under Plan 5 (from 2023), graduates repay for 40 years. 72% of graduates under Plan 2 never r',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social Housing',
  description: 'Just 6,400 social rented homes were built in England in 2021/22 compared to 152,000 in 1975. Average social rent is £100 per week vs £230 for market rent. 1.2 m',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

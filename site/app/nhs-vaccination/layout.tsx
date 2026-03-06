import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHS Vaccination',
  description: 'MMR (measles, mumps, rubella) vaccine uptake in 2-year-olds fell to 89% in 2023 below the 95% herd immunity threshold for the first time since 2011. The UK lost',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Long-Term Conditions',
  description: '15.4 million people in England live with two or more long-term conditions accounting for 77% of all NHS spending. By 2035, this is projected to rise to 17.9 mil',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

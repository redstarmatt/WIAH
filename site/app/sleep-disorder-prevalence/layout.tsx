import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sleep Disorder Prevalence',
  description: 'An estimated 1 in 3 UK adults report poor sleep, with insomnia prescriptions rising and links to chronic disease well established.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

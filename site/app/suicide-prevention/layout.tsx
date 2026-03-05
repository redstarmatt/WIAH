import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Suicide Prevention',
  description: 'Around 5,642 deaths by suicide were registered in England and Wales in 2022 the highest since 1999. Men account for 75% of all suicides. Suicide is the leading ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

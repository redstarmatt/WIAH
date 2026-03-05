import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Veteran Mental Health',
  description: 'Around 6% of UK veterans some 120,000 people have probable PTSD or another common mental health disorder related to their service, but many face years-long wait',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

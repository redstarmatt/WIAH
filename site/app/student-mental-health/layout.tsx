import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Mental Health',
  description: 'University counselling services are overwhelmed demand has risen 50% in five years while funding has not kept pace with 1 in 4 students reporting a mental healt',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

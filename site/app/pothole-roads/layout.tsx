import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pothole Roads',
  description: 'The local road maintenance backlog has reached 16.3 billion, up 63% from 2015. Councils filled around 2.1 million potholes in 2024, but the rate of new damage c',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

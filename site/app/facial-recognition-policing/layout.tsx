import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Facial Recognition Policing',
  description: 'The Metropolitan Police carried out 97 live facial recognition deployments in 2024, identifying 454 people but with a significant false positive rate.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

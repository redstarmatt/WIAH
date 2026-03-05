import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dementia',
  description: 'Almost a million people in the UK are living with dementia, but diagnosis rates are falling and care capacity is being overwhelmed.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

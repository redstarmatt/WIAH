import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unpaid Carers',
  description: '10.6 million people in the UK provide unpaid care looking after a disabled, elderly, or ill family member or friend. Their contribution is valued at 162 billion',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

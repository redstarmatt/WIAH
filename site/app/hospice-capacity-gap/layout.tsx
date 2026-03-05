import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hospice Capacity Gap',
  description: 'England has around 3,300 specialist palliative care beds an estimated shortfall of 1,200 against need.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

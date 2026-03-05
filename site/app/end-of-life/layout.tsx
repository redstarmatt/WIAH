import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'End of Life Care',
  description: '47% of people die in their preferred place home or a hospice. 45.8% still die in hospital. Hospices receive just 34% of their funding from the NHS, leaving them',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

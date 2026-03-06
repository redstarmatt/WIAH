import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adult social care',
  description: 'There are 410,000 people in residential and nursing care homes in England. One in four care homes has been rated requires improvement or inadequate by the CQC. ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

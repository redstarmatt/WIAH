import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stroke',
  description: 'Stroke kills 35,000 people a year in England and is the leading cause of adult disability. Only 11% of ischaemic stroke patients receive clot-busting thrombolys',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Funeral Poverty',
  description: 'The average cost of a funeral in the UK is now 4,141 up 130% since 2004. Around 110,000 families each year cannot afford the cost of burying a loved one without',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Veterans',
  description: 'There are an estimated 2.4 million veterans in the UK. Around 1 in 5 combat veterans experiences PTSD. Op COURAGE, the NHS mental health service for veterans, r',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social Care',
  description: '1.5 million people in England receive publicly funded social care. 532,000 care home places are available but 165,000 beds are unfilled due to staff shortages. ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

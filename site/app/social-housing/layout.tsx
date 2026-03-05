import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social Housing',
  description: 'Only 7,500 social rent homes were built in 2023 a 17-year low. 1.29 million households are on waiting lists. Since 1980, 1.8 million council homes have been sol',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

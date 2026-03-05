import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trees &amp; Forests',
  description: 'England planted 7,164 hectares of new trees in 2024/25 the highest rate in over 20 years, up 156% since 2021/22. The acceleration is real and verified by the Fo',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

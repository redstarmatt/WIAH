import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Protest Policing',
  description: 'New public order powers introduced since 2022 give police sweeping authority to restrict protests — and have been used to arrest 4,278 people in 2023 alone.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

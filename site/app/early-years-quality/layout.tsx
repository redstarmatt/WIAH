import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Early Years Quality',
  description: '96% of nurseries and childminders are rated Good or Outstanding by Ofsted but 1.3 million children live in areas with too few childcare places.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

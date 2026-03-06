import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social Prescribing',
  description: 'Social prescribing link workers handled 550,000 referrals in 2023/24, with evidence of significant reductions in GP appointment demand.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

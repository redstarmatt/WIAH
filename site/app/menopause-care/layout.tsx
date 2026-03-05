import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Menopause Care',
  description: '84% of women with menopause symptoms say their quality of life is affected, yet HRT prescriptions though rising still reach fewer than 1 in 7 menopausal women, ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Birth Trauma',
  description: 'An estimated 1 in 3 women describe their birth experience as traumatic, with significant variation in postnatal support.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

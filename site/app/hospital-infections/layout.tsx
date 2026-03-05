import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hospital Infections',
  description: 'C.difficile cases have risen for two consecutive years after decades of decline, and an estimated 300,000 patients acquire healthcare-associated infections annu',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cybercrime',
  description: 'The Crime Survey estimates 1.9 million computer misuse offences annually in England and Wales, yet prosecutions number fewer than 900 per year. Ransomware attac',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

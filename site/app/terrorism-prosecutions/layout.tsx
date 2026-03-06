import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terrorism Prosecutions',
  description: 'In 2023, 350 terrorism-related arrests were made in the UK, with a 74% conviction rate at trial.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

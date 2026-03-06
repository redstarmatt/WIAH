import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Border Security',
  description: '36,816 people crossed the English Channel in small boats in 2024, up 25% on 2023. The asylum decision backlog stood at 98,600 cases at the end of 2025, down fro',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gambling',
  description: '430,000 people in England are problem gamblers. Online gambling gross yield has grown to 7.1 billion. Betting shops have halved since 2010. The 2023 White Paper',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

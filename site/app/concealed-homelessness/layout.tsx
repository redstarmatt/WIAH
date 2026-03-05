import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Concealed Homelessness',
  description: 'Rough sleeping counts capture only the most visible homeless an estimated 400,000 people are sofa-surfing or hidden from official statistics.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

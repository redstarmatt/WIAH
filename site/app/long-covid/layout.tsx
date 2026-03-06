import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Long COVID',
  description: 'An estimated 1.5 million people in the UK have long COVID, down from a peak of 2.1 million in 2022. 800,000 report limitations on daily activities. 50,000 are u',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

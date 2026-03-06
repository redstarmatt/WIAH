import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cladding Crisis',
  description: '4,603 residential buildings over 11 metres have unsafe cladding 5 years after Grenfell. Only 30% have been fully remediated by 2024. Around 1 million residents ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

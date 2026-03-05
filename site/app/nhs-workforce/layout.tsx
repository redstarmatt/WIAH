import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHS Workforce',
  description: 'The NHS in England has over 112,000 vacancies a vacancy rate of 8.4% with nursing and mental health the most acute shortfalls, underpinned by a decade of underi',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

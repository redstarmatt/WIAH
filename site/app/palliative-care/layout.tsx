import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Palliative Care',
  description: 'Hospices provide care for over 200,000 people each year but receive just 27% of their funding from the NHS the rest comes from charity shops, donations, and fun',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

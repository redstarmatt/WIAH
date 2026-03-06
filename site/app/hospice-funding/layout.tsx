import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hospice Funding',
  description: 'Hospices provide 30% of all specialist palliative care in the UK but receive only 27% of their funding from the NHS down from 34% in 2014 relying instead on cha',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

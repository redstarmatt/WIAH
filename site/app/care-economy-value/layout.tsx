import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Care Economy Value',
  description: 'Britain\'s 10.6 million unpaid carers provide £93 billion of care annually — more than the NHS England budget — while average Carer\'s Allowance is just £81.90 pe',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

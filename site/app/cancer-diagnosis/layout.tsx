import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cancer Diagnosis',
  description: 'Only 54% of cancers in England are diagnosed at stages 1 or 2, against a target of 75% by 2028. Stage 4 bowel cancer has a 7% five-year survival rate compared t',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

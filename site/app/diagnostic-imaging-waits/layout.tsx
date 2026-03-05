import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diagnostic Imaging Waits',
  description: '1.6 million people waiting for diagnostic tests MRI, CT and endoscopy backlogs mean cancers and conditions go undetected for months.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

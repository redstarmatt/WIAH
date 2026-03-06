import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Long Are People Waiting for Scans?',
  description: '1.6 million people waiting for diagnostic tests — MRI, CT and endoscopy backlogs mean cancers and conditions go undetected for months.',
  openGraph: {
    title: 'How Long Are People Waiting for Scans?',
    description: '1.6 million people waiting for diagnostic tests — MRI, CT and endoscopy backlogs mean cancers and conditions go undetected for months.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/diagnostic-imaging-waits',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Long Are People Waiting for Scans?',
    description: '1.6 million people waiting for diagnostic tests — MRI, CT and endoscopy backlogs mean cancers and conditions go undetected for months.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/diagnostic-imaging-waits',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

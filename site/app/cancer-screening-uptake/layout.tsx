import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are You Getting Screened for Cancer?',
  description: 'Cervical, breast and bowel screening uptake has fallen below the levels needed for effective cancer prevention.',
  openGraph: {
    title: 'Are You Getting Screened for Cancer?',
    description: 'Cervical, breast and bowel screening uptake has fallen below the levels needed for effective cancer prevention.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/cancer-screening-uptake',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are You Getting Screened for Cancer?',
    description: 'Cervical, breast and bowel screening uptake has fallen below the levels needed for effective cancer prevention.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/cancer-screening-uptake',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

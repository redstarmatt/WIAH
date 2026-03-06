import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Britain&apos;s Seas Actually Being Protected?',
  description: 'Only 36&percnt; of the UK&apos;s Marine Protected Areas are in favourable condition, and just 49&percnt; of assessed fish stocks are being harvested sustainably. Despite designating 38&percnt; of UK waters as MPAs, most receive little active management.',
  openGraph: {
    title: 'Are Britain&apos;s Seas Actually Being Protected?',
    description: 'Only 36&percnt; of the UK&apos;s Marine Protected Areas are in favourable condition, and just 49&percnt; of assessed fish stocks are being harvested sustainably. Despite designating 38&percnt; of UK waters as MPAs, most receive little active management.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/marine-environment',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Britain&apos;s Seas Actually Being Protected?',
    description: 'Only 36&percnt; of the UK&apos;s Marine Protected Areas are in favourable condition, and just 49&percnt; of assessed fish stocks are being harvested sustainably. Despite designating 38&percnt; of UK waters as MPAs, most receive little active management.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/marine-environment',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

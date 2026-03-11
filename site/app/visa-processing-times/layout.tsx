import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `How Long Does It Take to Get a UK Visa?`,
  description: 'UK visa processing times vary enormously: skilled worker visas now average 12 days but family reunification visas average 60 days, with significant waits for complex cases.',
  openGraph: {
    title: `How Long Does It Take to Get a UK Visa?`,
    description: 'UK visa processing times vary enormously: skilled worker visas now average 12 days but family reunification visas average 60 days, with significant waits for complex cases.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/visa-processing-times',
  },
  twitter: {
    card: 'summary_large_image',
    title: `How Long Does It Take to Get a UK Visa?`,
    description: 'UK visa processing times vary enormously: skilled worker visas now average 12 days but family reunification visas average 60 days, with significant waits for complex cases.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/visa-processing-times',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

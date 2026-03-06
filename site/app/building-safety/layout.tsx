import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many People Still Live in Buildings With Dangerous Cladding?',
  description: 'Nearly eight years after the Grenfell Tower fire killed 72 people, over 3,600 residential buildings with unsafe cladding have not yet completed remediation. An estimated 300,000 leaseholders remain trapped in flats they cannot sell, with waking watch costs of up to &pound;500 per month per household. The government&apos;s &pound;5.1 billion Building Safety Fund has disbursed less than half its allocation.',
  openGraph: {
    title: 'How Many People Still Live in Buildings With Dangerous Cladding?',
    description: 'Nearly eight years after the Grenfell Tower fire killed 72 people, over 3,600 residential buildings with unsafe cladding have not yet completed remediation. An estimated 300,000 leaseholders remain trapped in flats they cannot sell, with waking watch costs of up to &pound;500 per month per household. The government&apos;s &pound;5.1 billion Building Safety Fund has disbursed less than half its allocation.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/building-safety',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many People Still Live in Buildings With Dangerous Cladding?',
    description: 'Nearly eight years after the Grenfell Tower fire killed 72 people, over 3,600 residential buildings with unsafe cladding have not yet completed remediation. An estimated 300,000 leaseholders remain trapped in flats they cannot sell, with waking watch costs of up to &pound;500 per month per household. The government&apos;s &pound;5.1 billion Building Safety Fund has disbursed less than half its allocation.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/building-safety',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are We Looking After Veterans&apos; Mental Health?',
  description: 'Around 6&percnt; of UK veterans &mdash; some 120,000 people &mdash; have probable PTSD or another common mental health disorder related to their service, but many face years-long waits for specialist treatment and encounter stigma that prevents them seeking help at all.',
  openGraph: {
    title: 'Are We Looking After Veterans&apos; Mental Health?',
    description: 'Around 6&percnt; of UK veterans &mdash; some 120,000 people &mdash; have probable PTSD or another common mental health disorder related to their service, but many face years-long waits for specialist treatment and encounter stigma that prevents them seeking help at all.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/veteran-mental-health',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are We Looking After Veterans&apos; Mental Health?',
    description: 'Around 6&percnt; of UK veterans &mdash; some 120,000 people &mdash; have probable PTSD or another common mental health disorder related to their service, but many face years-long waits for specialist treatment and encounter stigma that prevents them seeking help at all.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/veteran-mental-health',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Who is being left behind online?',
  description: '7.5 million adults in the UK lack basic digital skills, and as public services, banking, and healthcare move online, digital exclusion is becoming a fundamental barrier to participation in modern life.',
  openGraph: {
    title: 'Who is being left behind online?',
    description: '7.5 million adults in the UK lack basic digital skills, and as public services, banking, and healthcare move online, digital exclusion is becoming a fundamental barrier to participation in modern life.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/digital-exclusion',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Who is being left behind online?',
    description: '7.5 million adults in the UK lack basic digital skills, and as public services, banking, and healthcare move online, digital exclusion is becoming a fundamental barrier to participation in modern life.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/digital-exclusion',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

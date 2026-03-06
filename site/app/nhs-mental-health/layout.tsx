import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can You Actually Get Mental Health Treatment on the NHS?',
  description: '1.9 million people are in contact with NHS mental health services each month. But waits for talking therapies average 11 weeks; for children&apos;s services, 18 weeks. 1 in 4 adults experience a mental health problem each year. NHS mental health spending reached &pound;14.1 billion in 2022/23 &mdash; but demand is rising faster than capacity.',
  openGraph: {
    title: 'Can You Actually Get Mental Health Treatment on the NHS?',
    description: '1.9 million people are in contact with NHS mental health services each month. But waits for talking therapies average 11 weeks; for children&apos;s services, 18 weeks. 1 in 4 adults experience a mental health problem each year. NHS mental health spending reached &pound;14.1 billion in 2022/23 &mdash; but demand is rising faster than capacity.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-mental-health',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can You Actually Get Mental Health Treatment on the NHS?',
    description: '1.9 million people are in contact with NHS mental health services each month. But waits for talking therapies average 11 weeks; for children&apos;s services, 18 weeks. 1 in 4 adults experience a mental health problem each year. NHS mental health spending reached &pound;14.1 billion in 2022/23 &mdash; but demand is rising faster than capacity.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-mental-health',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

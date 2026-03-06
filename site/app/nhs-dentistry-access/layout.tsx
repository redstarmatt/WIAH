import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can you actually get an NHS dentist?',
  description: '43 million adults in England cannot access an NHS dentist when they need one. The number of NHS dental treatments completed has fallen by 4.7 million since 2019/20, and has never recovered from COVID.',
  openGraph: {
    title: 'Can you actually get an NHS dentist?',
    description: '43 million adults in England cannot access an NHS dentist when they need one. The number of NHS dental treatments completed has fallen by 4.7 million since 2019/20, and has never recovered from COVID.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-dentistry-access',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can you actually get an NHS dentist?',
    description: '43 million adults in England cannot access an NHS dentist when they need one. The number of NHS dental treatments completed has fallen by 4.7 million since 2019/20, and has never recovered from COVID.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-dentistry-access',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

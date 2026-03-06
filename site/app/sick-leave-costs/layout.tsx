import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Much Is Illness Costing the Economy?',
  description: '185 million working days were lost to sickness absence in 2023, costing the economy an estimated £32 billion — driven by a surge in long-term sick.',
  openGraph: {
    title: 'How Much Is Illness Costing the Economy?',
    description: '185 million working days were lost to sickness absence in 2023, costing the economy an estimated £32 billion — driven by a surge in long-term sick.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/sick-leave-costs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much Is Illness Costing the Economy?',
    description: '185 million working days were lost to sickness absence in 2023, costing the economy an estimated £32 billion — driven by a surge in long-term sick.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/sick-leave-costs',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

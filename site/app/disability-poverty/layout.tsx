import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How much more likely is a disabled person to be in poverty?',
  description: 'The disability poverty rate is 29% — nearly double the non-disabled rate of 16%. Disabled households face an estimated £570/month in additional costs relating to their disability. 45% of everyone in poverty is disabled or lives with someone who is.',
  openGraph: {
    title: 'How much more likely is a disabled person to be in poverty?',
    description: 'The disability poverty rate is 29% — nearly double the non-disabled rate of 16%. Disabled households face an estimated £570/month in additional costs relating to their disability. 45% of everyone in poverty is disabled or lives with someone who is.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/disability-poverty',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How much more likely is a disabled person to be in poverty?',
    description: 'The disability poverty rate is 29% — nearly double the non-disabled rate of 16%. Disabled households face an estimated £570/month in additional costs relating to their disability. 45% of everyone in poverty is disabled or lives with someone who is.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/disability-poverty',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

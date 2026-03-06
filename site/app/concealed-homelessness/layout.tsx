import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many People Are Secretly Homeless?',
  description: 'Rough sleeping counts capture only the most visible homeless &mdash; an estimated 400,000 people are sofa-surfing or hidden from official statistics.',
  openGraph: {
    title: 'How Many People Are Secretly Homeless?',
    description: 'Rough sleeping counts capture only the most visible homeless &mdash; an estimated 400,000 people are sofa-surfing or hidden from official statistics.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/concealed-homelessness',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many People Are Secretly Homeless?',
    description: 'Rough sleeping counts capture only the most visible homeless &mdash; an estimated 400,000 people are sofa-surfing or hidden from official statistics.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/concealed-homelessness',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

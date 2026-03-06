import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How long do people wait for social care?',
  description: '415,000 people in England are waiting for a social care assessment or service. One in three waits more than 6 months. An estimated 1.5 million people have unmet social care needs — care they require but are not receiving.',
  openGraph: {
    title: 'How long do people wait for social care?',
    description: '415,000 people in England are waiting for a social care assessment or service. One in three waits more than 6 months. An estimated 1.5 million people have unmet social care needs — care they require but are not receiving.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/social-care-waiting',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How long do people wait for social care?',
    description: '415,000 people in England are waiting for a social care assessment or service. One in three waits more than 6 months. An estimated 1.5 million people have unmet social care needs — care they require but are not receiving.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/social-care-waiting',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

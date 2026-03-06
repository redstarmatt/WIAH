import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Much Does the NHS Depend on Staff From Overseas?',
  description: 'One in three NHS nurses trained outside the UK — the highest proportion on record, raising concerns about global health equity.',
  openGraph: {
    title: 'How Much Does the NHS Depend on Staff From Overseas?',
    description: 'One in three NHS nurses trained outside the UK — the highest proportion on record, raising concerns about global health equity.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-international-workers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much Does the NHS Depend on Staff From Overseas?',
    description: 'One in three NHS nurses trained outside the UK — the highest proportion on record, raising concerns about global health equity.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-international-workers',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

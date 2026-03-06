import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How much support do bereaved people receive?',
  description: 'Around 600,000 people are bereaved each year in England. Fewer than 10% access specialist bereavement support.',
  openGraph: {
    title: 'How much support do bereaved people receive?',
    description: 'Around 600,000 people are bereaved each year in England. Fewer than 10% access specialist bereavement support.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/bereavement-support',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How much support do bereaved people receive?',
    description: 'Around 600,000 people are bereaved each year in England. Fewer than 10% access specialist bereavement support.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/bereavement-support',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is there enough hospice capacity in England?',
  description: 'England has around 3,300 specialist palliative care beds — an estimated shortfall of 1,200 against need.',
  openGraph: {
    title: 'Is there enough hospice capacity in England?',
    description: 'England has around 3,300 specialist palliative care beds — an estimated shortfall of 1,200 against need.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/hospice-capacity-gap',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is there enough hospice capacity in England?',
    description: 'England has around 3,300 specialist palliative care beds — an estimated shortfall of 1,200 against need.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/hospice-capacity-gap',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are disabled children getting the support they need?',
  description: '240,000 disabled children are estimated to need social care support, but fewer than 90,000 receive it.',
  openGraph: {
    title: 'Are disabled children getting the support they need?',
    description: '240,000 disabled children are estimated to need social care support, but fewer than 90,000 receive it.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/disabled-children-care',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are disabled children getting the support they need?',
    description: '240,000 disabled children are estimated to need social care support, but fewer than 90,000 receive it.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/disabled-children-care',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

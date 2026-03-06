import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How much does where you live affect what you earn?',
  description: 'The median full-time worker in London earns £46,100 — £15,900 more than their counterpart in Wales or the North East (£30,200). The gap has nearly quadrupled since 1997, as financial services and tech concentrate in London.',
  openGraph: {
    title: 'How much does where you live affect what you earn?',
    description: 'The median full-time worker in London earns £46,100 — £15,900 more than their counterpart in Wales or the North East (£30,200). The gap has nearly quadrupled since 1997, as financial services and tech concentrate in London.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/regional-pay',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How much does where you live affect what you earn?',
    description: 'The median full-time worker in London earns £46,100 — £15,900 more than their counterpart in Wales or the North East (£30,200). The gap has nearly quadrupled since 1997, as financial services and tech concentrate in London.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/regional-pay',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

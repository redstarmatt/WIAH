import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are There Enough Places for Children With Complex Needs?',
  description: 'Special school applications outstrip places by 30%, with 5,200 children currently without a placement — some waiting over a year for a school.',
  openGraph: {
    title: 'Are There Enough Places for Children With Complex Needs?',
    description: 'Special school applications outstrip places by 30%, with 5,200 children currently without a placement — some waiting over a year for a school.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/special-school-places',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are There Enough Places for Children With Complex Needs?',
    description: 'Special school applications outstrip places by 30%, with 5,200 children currently without a placement — some waiting over a year for a school.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/special-school-places',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

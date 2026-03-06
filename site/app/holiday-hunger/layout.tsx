import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Children Going Hungry in School Holidays?',
  description: '2.5 million children are at risk of holiday hunger when free school meal provision ends at half-terms and holidays.',
  openGraph: {
    title: 'Are Children Going Hungry in School Holidays?',
    description: '2.5 million children are at risk of holiday hunger when free school meal provision ends at half-terms and holidays.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/holiday-hunger',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Children Going Hungry in School Holidays?',
    description: '2.5 million children are at risk of holiday hunger when free school meal provision ends at half-terms and holidays.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/holiday-hunger',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

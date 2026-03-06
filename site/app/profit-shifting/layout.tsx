import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Large Companies Paying Their Fair Share of Tax?',
  description: 'HMRC estimates £6.5 billion in corporate tax goes unpaid each year, with multinational profit-shifting accounting for the largest share.',
  openGraph: {
    title: 'Are Large Companies Paying Their Fair Share of Tax?',
    description: 'HMRC estimates £6.5 billion in corporate tax goes unpaid each year, with multinational profit-shifting accounting for the largest share.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/profit-shifting',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Large Companies Paying Their Fair Share of Tax?',
    description: 'HMRC estimates £6.5 billion in corporate tax goes unpaid each year, with multinational profit-shifting accounting for the largest share.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/profit-shifting',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Who Is Being Left Out of the Financial System?',
  description: '1.2 million UK adults remain unbanked while bank branch closures have removed 6,200 access points since 2015, concentrated in deprived areas.',
  openGraph: {
    title: 'Who Is Being Left Out of the Financial System?',
    description: '1.2 million UK adults remain unbanked while bank branch closures have removed 6,200 access points since 2015, concentrated in deprived areas.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/financial-inclusion',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Who Is Being Left Out of the Financial System?',
    description: '1.2 million UK adults remain unbanked while bank branch closures have removed 6,200 access points since 2015, concentrated in deprived areas.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/financial-inclusion',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is youth diversion actually working?',
  description: 'Youth reoffending has fallen 50% since 2010, driven by a shift towards community-based diversion over custody.',
  openGraph: {
    title: 'Is youth diversion actually working?',
    description: 'Youth reoffending has fallen 50% since 2010, driven by a shift towards community-based diversion over custody.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/youth-diversion-outcomes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is youth diversion actually working?',
    description: 'Youth reoffending has fallen 50% since 2010, driven by a shift towards community-based diversion over custody.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/youth-diversion-outcomes',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

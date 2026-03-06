import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How effective are UK terrorism prosecutions?',
  description: 'In 2023, 350 terrorism-related arrests were made in the UK, with a 74% conviction rate at trial.',
  openGraph: {
    title: 'How effective are UK terrorism prosecutions?',
    description: 'In 2023, 350 terrorism-related arrests were made in the UK, with a 74% conviction rate at trial.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/terrorism-prosecutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How effective are UK terrorism prosecutions?',
    description: 'In 2023, 350 terrorism-related arrests were made in the UK, with a 74% conviction rate at trial.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/terrorism-prosecutions',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

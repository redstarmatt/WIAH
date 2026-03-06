import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many Jobs Will Automation Replace?',
  description: '7.4 million UK jobs are at high risk of automation — but history suggests new jobs are created faster than old ones disappear.',
  openGraph: {
    title: 'How Many Jobs Will Automation Replace?',
    description: '7.4 million UK jobs are at high risk of automation — but history suggests new jobs are created faster than old ones disappear.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/automation-displacement',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many Jobs Will Automation Replace?',
    description: '7.4 million UK jobs are at high risk of automation — but history suggests new jobs are created faster than old ones disappear.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/automation-displacement',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

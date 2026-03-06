import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is the War on Drugs Working?',
  description: 'Thousands of county lines are dismantled each year — but drug deaths continue to rise, suggesting supply is replaced faster than it is disrupted.',
  openGraph: {
    title: 'Is the War on Drugs Working?',
    description: 'Thousands of county lines are dismantled each year — but drug deaths continue to rise, suggesting supply is replaced faster than it is disrupted.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/drug-supply-operations',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is the War on Drugs Working?',
    description: 'Thousands of county lines are dismantled each year — but drug deaths continue to rise, suggesting supply is replaced faster than it is disrupted.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/drug-supply-operations',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Common Is Disability Hate Crime?',
  description: 'Disability hate crime reports have risen 80% since 2015 to 12,300 recorded offences — but fewer than 1 in 10 cases results in a charge.',
  openGraph: {
    title: 'How Common Is Disability Hate Crime?',
    description: 'Disability hate crime reports have risen 80% since 2015 to 12,300 recorded offences — but fewer than 1 in 10 cases results in a charge.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/disability-hate-crime',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Common Is Disability Hate Crime?',
    description: 'Disability hate crime reports have risen 80% since 2015 to 12,300 recorded offences — but fewer than 1 in 10 cases results in a charge.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/disability-hate-crime',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

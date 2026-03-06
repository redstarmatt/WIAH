import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Is Britain Still So Dangerous for Cyclists?',
  description: 'Just 2.2&percnt; of all journeys in England are made by bike &mdash; compared with 27&percnt; in the Netherlands &mdash; and the figure has barely moved in a decade despite successive government cycling strategies. England has only 680 miles of protected cycle lanes. There are over 17,000 cyclist casualties every year, and the active travel budget was cut from &pound;3 billion to &pound;1.5 billion in 2024 before the mission was even halfway complete.',
  openGraph: {
    title: 'Why Is Britain Still So Dangerous for Cyclists?',
    description: 'Just 2.2&percnt; of all journeys in England are made by bike &mdash; compared with 27&percnt; in the Netherlands &mdash; and the figure has barely moved in a decade despite successive government cycling strategies. England has only 680 miles of protected cycle lanes. There are over 17,000 cyclist casualties every year, and the active travel budget was cut from &pound;3 billion to &pound;1.5 billion in 2024 before the mission was even halfway complete.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/cycling-infrastructure',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Is Britain Still So Dangerous for Cyclists?',
    description: 'Just 2.2&percnt; of all journeys in England are made by bike &mdash; compared with 27&percnt; in the Netherlands &mdash; and the figure has barely moved in a decade despite successive government cycling strategies. England has only 680 miles of protected cycle lanes. There are over 17,000 cyclist casualties every year, and the active travel budget was cut from &pound;3 billion to &pound;1.5 billion in 2024 before the mission was even halfway complete.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/cycling-infrastructure',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

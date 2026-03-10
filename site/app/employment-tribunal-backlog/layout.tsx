import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Do Half a Million People Have Employment Cases Unheard?",
  description: "There are 540,000 outstanding employment tribunal cases — a record, up from 187,000 in 2018. The average wait from claim to hearing is now two years. Many workers give up before their case is heard.",
  openGraph: {
    title: "Why Do Half a Million People Have Employment Cases Unheard?",
    description: "There are 540,000 outstanding employment tribunal cases — a record, up from 187,000 in 2018. The average wait from claim to hearing is now two years. Many workers give up before their case is heard.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/employment-tribunal-backlog',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Do Half a Million People Have Employment Cases Unheard?",
    description: "There are 540,000 outstanding employment tribunal cases — a record, up from 187,000 in 2018. The average wait from claim to hearing is now two years. Many workers give up before their case is heard.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/employment-tribunal-backlog',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Who Is Being Excluded from School in Britain?',
  description: '9,160 children were permanently excluded from English schools in 2022/23 &mdash; up 77% since 2015/16. A further 787,000 suspensions were issued. Boys, children with SEND, and children eligible for free school meals are dramatically over-represented. Each permanent exclusion costs the state an estimated &pound;60,000 over a lifetime.',
  openGraph: {
    title: 'Who Is Being Excluded from School in Britain?',
    description: '9,160 children were permanently excluded from English schools in 2022/23 &mdash; up 77% since 2015/16. A further 787,000 suspensions were issued. Boys, children with SEND, and children eligible for free school meals are dramatically over-represented. Each permanent exclusion costs the state an estimated &pound;60,000 over a lifetime.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/school-exclusions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Who Is Being Excluded from School in Britain?',
    description: '9,160 children were permanently excluded from English schools in 2022/23 &mdash; up 77% since 2015/16. A further 787,000 suspensions were issued. Boys, children with SEND, and children eligible for free school meals are dramatically over-represented. Each permanent exclusion costs the state an estimated &pound;60,000 over a lifetime.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/school-exclusions',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

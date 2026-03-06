import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is the Probation Service Keeping the Public Safe?',
  description: 'The Probation Service supervises 232,000 offenders in the community, but a botched part-privatisation in 2014 &mdash; widely regarded as one of the worst public service reforms in a generation &mdash; left the service understaffed, fragmented, and overwhelmed. Serious Further Offences by people on probation rose from 530 in 2015 to 820 in 2023, while officer vacancy rates reached 16&percnt; against a recommended maximum caseload of 35 offenders per officer.',
  openGraph: {
    title: 'Is the Probation Service Keeping the Public Safe?',
    description: 'The Probation Service supervises 232,000 offenders in the community, but a botched part-privatisation in 2014 &mdash; widely regarded as one of the worst public service reforms in a generation &mdash; left the service understaffed, fragmented, and overwhelmed. Serious Further Offences by people on probation rose from 530 in 2015 to 820 in 2023, while officer vacancy rates reached 16&percnt; against a recommended maximum caseload of 35 offenders per officer.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/probation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is the Probation Service Keeping the Public Safe?',
    description: 'The Probation Service supervises 232,000 offenders in the community, but a botched part-privatisation in 2014 &mdash; widely regarded as one of the worst public service reforms in a generation &mdash; left the service understaffed, fragmented, and overwhelmed. Serious Further Offences by people on probation rose from 530 in 2015 to 820 in 2023, while officer vacancy rates reached 16&percnt; against a recommended maximum caseload of 35 offenders per officer.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/probation',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

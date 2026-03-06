import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Long Are People Waiting for Justice?',
  description: '67,573 cases are outstanding in England&apos;s Crown Courts &mdash; up from 41,000 before the pandemic. The 62,000-case target has not been met since 2020. Average time from offence to Crown Court completion exceeds 700 days. The magistrates&apos; courts backlog stands at 371,000 cases. Criminal legal aid rates have fallen 40% in real terms since 1994.',
  openGraph: {
    title: 'How Long Are People Waiting for Justice?',
    description: '67,573 cases are outstanding in England&apos;s Crown Courts &mdash; up from 41,000 before the pandemic. The 62,000-case target has not been met since 2020. Average time from offence to Crown Court completion exceeds 700 days. The magistrates&apos; courts backlog stands at 371,000 cases. Criminal legal aid rates have fallen 40% in real terms since 1994.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/court-backlog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Long Are People Waiting for Justice?',
    description: '67,573 cases are outstanding in England&apos;s Crown Courts &mdash; up from 41,000 before the pandemic. The 62,000-case target has not been met since 2020. Average time from offence to Crown Court completion exceeds 700 days. The magistrates&apos; courts backlog stands at 371,000 cases. Criminal legal aid rates have fallen 40% in real terms since 1994.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/court-backlog',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

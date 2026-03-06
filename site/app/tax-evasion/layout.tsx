import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Much Tax Goes Uncollected Every Year?',
  description: 'HMRC estimates the UK tax gap at &pound;39.8 billion per year &mdash; the difference between the tax that should be paid under the law and the amount actually collected. This sum exceeds the entire annual budget for policing in England and Wales. Meanwhile, HMRC&apos;s compliance workforce has shrunk, and the number of criminal prosecutions for tax fraud has fallen by over 70&percnt; since 2015.',
  openGraph: {
    title: 'How Much Tax Goes Uncollected Every Year?',
    description: 'HMRC estimates the UK tax gap at &pound;39.8 billion per year &mdash; the difference between the tax that should be paid under the law and the amount actually collected. This sum exceeds the entire annual budget for policing in England and Wales. Meanwhile, HMRC&apos;s compliance workforce has shrunk, and the number of criminal prosecutions for tax fraud has fallen by over 70&percnt; since 2015.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/tax-evasion',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much Tax Goes Uncollected Every Year?',
    description: 'HMRC estimates the UK tax gap at &pound;39.8 billion per year &mdash; the difference between the tax that should be paid under the law and the amount actually collected. This sum exceeds the entire annual budget for policing in England and Wales. Meanwhile, HMRC&apos;s compliance workforce has shrunk, and the number of criminal prosecutions for tax fraud has fallen by over 70&percnt; since 2015.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/tax-evasion',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

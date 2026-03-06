import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Does Council Tax Keep Rising While Services Are Cut?',
  description: 'Council tax in England has risen 25&percnt; in real terms since 2016 &mdash; with many councils raising bills by the maximum permitted 5&percnt; per year &mdash; yet local authorities are simultaneously closing libraries, cutting bin collections, and reducing adult social care, because government grants have fallen faster than council tax has risen.',
  openGraph: {
    title: 'Why Does Council Tax Keep Rising While Services Are Cut?',
    description: 'Council tax in England has risen 25&percnt; in real terms since 2016 &mdash; with many councils raising bills by the maximum permitted 5&percnt; per year &mdash; yet local authorities are simultaneously closing libraries, cutting bin collections, and reducing adult social care, because government grants have fallen faster than council tax has risen.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/council-tax',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Does Council Tax Keep Rising While Services Are Cut?',
    description: 'Council tax in England has risen 25&percnt; in real terms since 2016 &mdash; with many councils raising bills by the maximum permitted 5&percnt; per year &mdash; yet local authorities are simultaneously closing libraries, cutting bin collections, and reducing adult social care, because government grants have fallen faster than council tax has risen.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/council-tax',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

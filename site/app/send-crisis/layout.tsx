import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are children with special educational needs getting the support they need?',
  description: '576,000 children in England have an Education, Health and Care Plan — up 143% since 2014. The average wait is 28 weeks, against a 20-week legal limit. When parents appeal to tribunal, they win 88% of the time — pointing to systematic underprovision.',
  openGraph: {
    title: 'Are children with special educational needs getting the support they need?',
    description: '576,000 children in England have an Education, Health and Care Plan — up 143% since 2014. The average wait is 28 weeks, against a 20-week legal limit. When parents appeal to tribunal, they win 88% of the time — pointing to systematic underprovision.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/send-crisis',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are children with special educational needs getting the support they need?',
    description: '576,000 children in England have an Education, Health and Care Plan — up 143% since 2014. The average wait is 28 weeks, against a 20-week legal limit. When parents appeal to tribunal, they win 88% of the time — pointing to systematic underprovision.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/send-crisis',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

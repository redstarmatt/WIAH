import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Second Homes Hollowing Out Communities?',
  description: 'Over 272,000 second homes and 230,000 short-term lets in England &mdash; concentrated in coastal and rural areas &mdash; are removing properties from local housing markets. Communities like St Ives, the Lake District, and the Norfolk Broads have seen 30&percnt; or more of their housing stock unavailable to permanent residents, driving prices beyond local earnings and depopulating villages.',
  openGraph: {
    title: 'Are Second Homes Hollowing Out Communities?',
    description: 'Over 272,000 second homes and 230,000 short-term lets in England &mdash; concentrated in coastal and rural areas &mdash; are removing properties from local housing markets. Communities like St Ives, the Lake District, and the Norfolk Broads have seen 30&percnt; or more of their housing stock unavailable to permanent residents, driving prices beyond local earnings and depopulating villages.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/second-homes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Second Homes Hollowing Out Communities?',
    description: 'Over 272,000 second homes and 230,000 short-term lets in England &mdash; concentrated in coastal and rural areas &mdash; are removing properties from local housing markets. Communities like St Ives, the Lake District, and the Norfolk Broads have seen 30&percnt; or more of their housing stock unavailable to permanent residents, driving prices beyond local earnings and depopulating villages.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/second-homes',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

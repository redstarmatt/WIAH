import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Many Communities Own Their Own Buildings?",
  description: "England now has 9,800 community-owned assets — pubs, shops, village halls — up from 6,200 in 2015. The Assets of Community Value register is enabling a quiet revolution in local ownership.",
  openGraph: {
    title: "How Many Communities Own Their Own Buildings?",
    description: "England now has 9,800 community-owned assets — pubs, shops, village halls — up from 6,200 in 2015. The Assets of Community Value register is enabling a quiet revolution in local ownership.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/community-asset-ownership',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Many Communities Own Their Own Buildings?",
    description: "England now has 9,800 community-owned assets — pubs, shops, village halls — up from 6,200 in 2015. The Assets of Community Value register is enabling a quiet revolution in local ownership.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/community-asset-ownership',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

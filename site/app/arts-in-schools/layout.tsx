import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are the arts disappearing from English schools?',
  description: 'GCSE art and design entries have fallen 41% since 2010. Music entries are down 41%, drama down 34%, dance down 44%. The EBacc — which excludes arts — has been the primary driver. Schools in deprived areas have cut arts most heavily.',
  openGraph: {
    title: 'Are the arts disappearing from English schools?',
    description: 'GCSE art and design entries have fallen 41% since 2010. Music entries are down 41%, drama down 34%, dance down 44%. The EBacc — which excludes arts — has been the primary driver. Schools in deprived areas have cut arts most heavily.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/arts-in-schools',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are the arts disappearing from English schools?',
    description: 'GCSE art and design entries have fallen 41% since 2010. Music entries are down 41%, drama down 34%, dance down 44%. The EBacc — which excludes arts — has been the primary driver. Schools in deprived areas have cut arts most heavily.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/arts-in-schools',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

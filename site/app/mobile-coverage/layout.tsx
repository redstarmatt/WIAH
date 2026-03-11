import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Where in the UK Can't You Make a Call?`,
  description: '4% of UK premises lack reliable indoor voice coverage from any operator. Rural areas and parts of Wales, Scotland and Northern England have limited operator choice, creating connectivity poverty.',
  openGraph: {
    title: `Where in the UK Can't You Make a Call?`,
    description: '4% of UK premises lack reliable indoor voice coverage from any operator. Rural areas and parts of Wales, Scotland and Northern England have limited operator choice, creating connectivity poverty.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/mobile-coverage',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Where in the UK Can't You Make a Call?`,
    description: '4% of UK premises lack reliable indoor voice coverage from any operator. Rural areas and parts of Wales, Scotland and Northern England have limited operator choice, creating connectivity poverty.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/mobile-coverage',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

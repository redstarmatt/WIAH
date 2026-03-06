import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Does Vocational Training Work for Young People?',
  description: 'Young people on vocational routes earn £4,200 less than those with equivalent A-levels — a gap that fuels the perceived hierarchy between academic and technical education.',
  openGraph: {
    title: 'Does Vocational Training Work for Young People?',
    description: 'Young people on vocational routes earn £4,200 less than those with equivalent A-levels — a gap that fuels the perceived hierarchy between academic and technical education.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/vocational-pathways',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Does Vocational Training Work for Young People?',
    description: 'Young people on vocational routes earn £4,200 less than those with equivalent A-levels — a gap that fuels the perceived hierarchy between academic and technical education.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/vocational-pathways',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

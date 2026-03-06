import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Did Voter ID Laws Reduce Turnout?',
  description: 'An estimated 14,000 people were turned away at polling stations in 2023 local elections after the new voter ID requirements.',
  openGraph: {
    title: 'Did Voter ID Laws Reduce Turnout?',
    description: 'An estimated 14,000 people were turned away at polling stations in 2023 local elections after the new voter ID requirements.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/voter-id-impact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Did Voter ID Laws Reduce Turnout?',
    description: 'An estimated 14,000 people were turned away at polling stations in 2023 local elections after the new voter ID requirements.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/voter-id-impact',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

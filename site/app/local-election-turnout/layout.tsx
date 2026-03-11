import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Is Anyone Still Voting in Local Elections?`,
  description: 'Local election turnout averages 37%, less than half of general election turnout. Some urban wards see less than 15% turnout, raising questions about the legitimacy of local democratic decisions.',
  openGraph: {
    title: `Is Anyone Still Voting in Local Elections?`,
    description: 'Local election turnout averages 37%, less than half of general election turnout. Some urban wards see less than 15% turnout, raising questions about the legitimacy of local democratic decisions.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/local-election-turnout',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Is Anyone Still Voting in Local Elections?`,
    description: 'Local election turnout averages 37%, less than half of general election turnout. Some urban wards see less than 15% turnout, raising questions about the legitimacy of local democratic decisions.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/local-election-turnout',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

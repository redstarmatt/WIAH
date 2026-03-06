import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Can't Britain Build Enough Homes?",
  description: "UK data and statistics on why can't britain build enough homes?. What is actually happening?",
  openGraph: {
    title: "Why Can't Britain Build Enough Homes?",
    description: "UK data and statistics on why can't britain build enough homes?. What is actually happening?",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/planning',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Can't Britain Build Enough Homes?",
    description: "UK data and statistics on why can't britain build enough homes?. What is actually happening?",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/planning',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Energy Bills Actually Still Too High?',
  description: 'UK data and statistics on are energy bills actually still too high?. What is actually happening?',
  openGraph: {
    title: 'Are Energy Bills Actually Still Too High?',
    description: 'UK data and statistics on are energy bills actually still too high?. What is actually happening?',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/energy-bills',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Energy Bills Actually Still Too High?',
    description: 'UK data and statistics on are energy bills actually still too high?. What is actually happening?',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/energy-bills',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

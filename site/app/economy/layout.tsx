import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are You Actually Better Off?',
  description: 'UK data and statistics on are you actually better off?. What is actually happening?',
  openGraph: {
    title: 'Are You Actually Better Off?',
    description: 'UK data and statistics on are you actually better off?. What is actually happening?',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/economy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are You Actually Better Off?',
    description: 'UK data and statistics on are you actually better off?. What is actually happening?',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/economy',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

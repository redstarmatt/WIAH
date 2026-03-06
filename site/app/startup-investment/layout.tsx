import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain Building the Companies of Tomorrow?',
  description: 'UK VC investment halved from its 2021 peak but Britain still produces more tech unicorns per capita than any country except the US.',
  openGraph: {
    title: 'Is Britain Building the Companies of Tomorrow?',
    description: 'UK VC investment halved from its 2021 peak but Britain still produces more tech unicorns per capita than any country except the US.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/startup-investment',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain Building the Companies of Tomorrow?',
    description: 'UK VC investment halved from its 2021 peak but Britain still produces more tech unicorns per capita than any country except the US.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/startup-investment',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

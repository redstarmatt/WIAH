import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are All Hungry Children Getting Free School Meals?',
  description: '870,000 children live in poverty but aren&rsquo;t eligible for free school meals because their family&rsquo;s income is just above the threshold.',
  openGraph: {
    title: 'Are All Hungry Children Getting Free School Meals?',
    description: '870,000 children live in poverty but aren&rsquo;t eligible for free school meals because their family&rsquo;s income is just above the threshold.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/free-school-meals-gap',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are All Hungry Children Getting Free School Meals?',
    description: '870,000 children live in poverty but aren&rsquo;t eligible for free school meals because their family&rsquo;s income is just above the threshold.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/free-school-meals-gap',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

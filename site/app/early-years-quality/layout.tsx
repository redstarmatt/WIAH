import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Early Years Care Actually Good Quality?',
  description: '96% of nurseries and childminders are rated Good or Outstanding by Ofsted &mdash; but 1.3 million children live in areas with too few childcare places.',
  openGraph: {
    title: 'Is Early Years Care Actually Good Quality?',
    description: '96% of nurseries and childminders are rated Good or Outstanding by Ofsted &mdash; but 1.3 million children live in areas with too few childcare places.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/early-years-quality',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Early Years Care Actually Good Quality?',
    description: '96% of nurseries and childminders are rated Good or Outstanding by Ofsted &mdash; but 1.3 million children live in areas with too few childcare places.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/early-years-quality',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

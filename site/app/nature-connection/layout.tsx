import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Are People Losing Touch with Nature?`,
  description: 'Only 57% of English adults visit green spaces regularly, with nature connection declining among urban children. Access to quality green space is twice as unequal by deprivation as overall park access.',
  openGraph: {
    title: `Are People Losing Touch with Nature?`,
    description: 'Only 57% of English adults visit green spaces regularly, with nature connection declining among urban children. Access to quality green space is twice as unequal by deprivation as overall park access.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nature-connection',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Are People Losing Touch with Nature?`,
    description: 'Only 57% of English adults visit green spaces regularly, with nature connection declining among urban children. Access to quality green space is twice as unequal by deprivation as overall park access.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nature-connection',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Young People Engaged With Their Communities?',
  description: 'Youth volunteering rates have fallen from 46% to 34% since 2010, reversing a generation of civic investment — though employer-supported programmes show new routes back.',
  openGraph: {
    title: 'Are Young People Engaged With Their Communities?',
    description: 'Youth volunteering rates have fallen from 46% to 34% since 2010, reversing a generation of civic investment — though employer-supported programmes show new routes back.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/youth-social-action',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Young People Engaged With Their Communities?',
    description: 'Youth volunteering rates have fallen from 46% to 34% since 2010, reversing a generation of civic investment — though employer-supported programmes show new routes back.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/youth-social-action',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

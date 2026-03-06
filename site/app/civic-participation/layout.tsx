import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain becoming less civic?',
  description: 'Formal volunteering has declined from 28% to 24% of adults since 2010. But mutual aid and grassroots activity grew dramatically during COVID and has partly sustained. Trussell Trust food banks now rely on 39,000 volunteers.',
  openGraph: {
    title: 'Is Britain becoming less civic?',
    description: 'Formal volunteering has declined from 28% to 24% of adults since 2010. But mutual aid and grassroots activity grew dramatically during COVID and has partly sustained. Trussell Trust food banks now rely on 39,000 volunteers.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/civic-participation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain becoming less civic?',
    description: 'Formal volunteering has declined from 28% to 24% of adults since 2010. But mutual aid and grassroots activity grew dramatically during COVID and has partly sustained. Trussell Trust food banks now rely on 39,000 volunteers.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/civic-participation',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Has Britain Stopped Training Its Adults?',
  description: 'Adult participation in learning has fallen from 20&percnt; to 15&percnt; since 2015. Further education enrolments have declined by 30&percnt; in a decade, from 3.3 million to 2.3 million. The Adult Education Budget has been cut by over 40&percnt; in real terms since 2010 while the UK faces critical skills shortages in construction, digital, and green energy.',
  openGraph: {
    title: 'Why Has Britain Stopped Training Its Adults?',
    description: 'Adult participation in learning has fallen from 20&percnt; to 15&percnt; since 2015. Further education enrolments have declined by 30&percnt; in a decade, from 3.3 million to 2.3 million. The Adult Education Budget has been cut by over 40&percnt; in real terms since 2010 while the UK faces critical skills shortages in construction, digital, and green energy.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/adult-education',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Has Britain Stopped Training Its Adults?',
    description: 'Adult participation in learning has fallen from 20&percnt; to 15&percnt; since 2015. Further education enrolments have declined by 30&percnt; in a decade, from 3.3 million to 2.3 million. The Adult Education Budget has been cut by over 40&percnt; in real terms since 2010 while the UK faces critical skills shortages in construction, digital, and green energy.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/adult-education',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

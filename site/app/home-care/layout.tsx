import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Older People Getting the Care They Need at Home?',
  description: 'An estimated 500,000 people in England are waiting for a care needs assessment or delayed in receiving a home care package &mdash; while 132,000 social care vacancies go unfilled and providers return contracts they can no longer afford to deliver.',
  openGraph: {
    title: 'Are Older People Getting the Care They Need at Home?',
    description: 'An estimated 500,000 people in England are waiting for a care needs assessment or delayed in receiving a home care package &mdash; while 132,000 social care vacancies go unfilled and providers return contracts they can no longer afford to deliver.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/home-care',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Older People Getting the Care They Need at Home?',
    description: 'An estimated 500,000 people in England are waiting for a care needs assessment or delayed in receiving a home care package &mdash; while 132,000 social care vacancies go unfilled and providers return contracts they can no longer afford to deliver.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/home-care',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are children being protected?',
  description: 'Child protection referrals have reached record levels while the social worker workforce is stretched to breaking point &mdash; leading to missed warning signs and preventable child deaths.',
  openGraph: {
    title: 'Are children being protected?',
    description: 'Child protection referrals have reached record levels while the social worker workforce is stretched to breaking point &mdash; leading to missed warning signs and preventable child deaths.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/child-protection',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are children being protected?',
    description: 'Child protection referrals have reached record levels while the social worker workforce is stretched to breaking point &mdash; leading to missed warning signs and preventable child deaths.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/child-protection',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

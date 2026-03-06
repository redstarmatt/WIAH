import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can Non-Medical Help Replace GP Appointments?',
  description: 'Social prescribing link workers handled 550,000 referrals in 2023/24, with evidence of significant reductions in GP appointment demand.',
  openGraph: {
    title: 'Can Non-Medical Help Replace GP Appointments?',
    description: 'Social prescribing link workers handled 550,000 referrals in 2023/24, with evidence of significant reductions in GP appointment demand.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/social-prescribing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can Non-Medical Help Replace GP Appointments?',
    description: 'Social prescribing link workers handled 550,000 referrals in 2023/24, with evidence of significant reductions in GP appointment demand.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/social-prescribing',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are We Locking Up Too Many Children?',
  description: 'The number of children in custody in England and Wales has fallen dramatically &mdash; from over 3,000 in 2008 to around 430 in 2024. But those who remain in custody are disproportionately children of colour and children with complex needs. Reoffending rates for young people leaving custody remain high, and the secure estate faces persistent concerns about violence, self-harm, and inadequate education.',
  openGraph: {
    title: 'Are We Locking Up Too Many Children?',
    description: 'The number of children in custody in England and Wales has fallen dramatically &mdash; from over 3,000 in 2008 to around 430 in 2024. But those who remain in custody are disproportionately children of colour and children with complex needs. Reoffending rates for young people leaving custody remain high, and the secure estate faces persistent concerns about violence, self-harm, and inadequate education.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/youth-justice',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are We Locking Up Too Many Children?',
    description: 'The number of children in custody in England and Wales has fallen dramatically &mdash; from over 3,000 in 2008 to around 430 in 2024. But those who remain in custody are disproportionately children of colour and children with complex needs. Reoffending rates for young people leaving custody remain high, and the secure estate faces persistent concerns about violence, self-harm, and inadequate education.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/youth-justice',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

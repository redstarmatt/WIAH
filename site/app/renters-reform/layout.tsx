import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are renters finally getting more protection?',
  description: 'Section 21 &lsquo;no-fault&rsquo; evictions were used 26,000 times in 2022/23, making over 22,000 households homeless annually. The Renters Rights Act 2024 abolishes Section 21 &mdash; a landmark for England&apos;s 11 million private renters.',
  openGraph: {
    title: 'Are renters finally getting more protection?',
    description: 'Section 21 &lsquo;no-fault&rsquo; evictions were used 26,000 times in 2022/23, making over 22,000 households homeless annually. The Renters Rights Act 2024 abolishes Section 21 &mdash; a landmark for England&apos;s 11 million private renters.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/renters-reform',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are renters finally getting more protection?',
    description: 'Section 21 &lsquo;no-fault&rsquo; evictions were used 26,000 times in 2022/23, making over 22,000 households homeless annually. The Renters Rights Act 2024 abolishes Section 21 &mdash; a landmark for England&apos;s 11 million private renters.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/renters-reform',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

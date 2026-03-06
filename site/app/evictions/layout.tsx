import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many Renters Are Being Forced Out of Their Homes?',
  description: 'Section 21 &ldquo;no-fault&rdquo; eviction notices have risen sharply since 2021 — landlords served 25,000&plus; notices in 2023 — and court-ordered evictions are at their highest since 2017, disproportionately affecting low-income renters and families with children in the private rented sector.',
  openGraph: {
    title: 'How Many Renters Are Being Forced Out of Their Homes?',
    description: 'Section 21 &ldquo;no-fault&rdquo; eviction notices have risen sharply since 2021 — landlords served 25,000&plus; notices in 2023 — and court-ordered evictions are at their highest since 2017, disproportionately affecting low-income renters and families with children in the private rented sector.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/evictions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many Renters Are Being Forced Out of Their Homes?',
    description: 'Section 21 &ldquo;no-fault&rdquo; eviction notices have risen sharply since 2021 — landlords served 25,000&plus; notices in 2023 — and court-ordered evictions are at their highest since 2017, disproportionately affecting low-income renters and families with children in the private rented sector.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/evictions',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

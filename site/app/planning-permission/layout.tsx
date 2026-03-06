import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is the Planning System Blocking the Homes Britain Needs?',
  description: 'England granted 474,000 planning permissions in 2023 but only 234,000 new homes were completed — a completion rate of under 50&percnt; — while the planning backlog has reached 500,000 undecided applications and planning department staffing has fallen 40&percnt; since 2010 due to budget cuts.',
  openGraph: {
    title: 'Is the Planning System Blocking the Homes Britain Needs?',
    description: 'England granted 474,000 planning permissions in 2023 but only 234,000 new homes were completed — a completion rate of under 50&percnt; — while the planning backlog has reached 500,000 undecided applications and planning department staffing has fallen 40&percnt; since 2010 due to budget cuts.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/planning-permission',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is the Planning System Blocking the Homes Britain Needs?',
    description: 'England granted 474,000 planning permissions in 2023 but only 234,000 new homes were completed — a completion rate of under 50&percnt; — while the planning backlog has reached 500,000 undecided applications and planning department staffing has fallen 40&percnt; since 2010 due to budget cuts.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/planning-permission',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Many People Are Forced Into Marriage in Britain?",
  description: "The Forced Marriage Unit handled 2,068 cases in 2023 — a record. One in four involved under-18s. Experts believe the true figure is many times higher, as cases go unreported within communities.",
  openGraph: {
    title: "How Many People Are Forced Into Marriage in Britain?",
    description: "The Forced Marriage Unit handled 2,068 cases in 2023 — a record. One in four involved under-18s. Experts believe the true figure is many times higher, as cases go unreported within communities.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/forced-marriage',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Many People Are Forced Into Marriage in Britain?",
    description: "The Forced Marriage Unit handled 2,068 cases in 2023 — a record. One in four involved under-18s. Experts believe the true figure is many times higher, as cases go unreported within communities.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/forced-marriage',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

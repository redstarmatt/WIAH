import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Are Britain's Public Libraries Disappearing?",
  description: 'England has lost over 770 library branches since 2010 — a 17% fall. Book issues have dropped 42%. But visits are recovering post-COVID, and libraries have expanded digital services. The question is whether a reimagined library can survive further council budget cuts.',
  openGraph: {
    title: "Are Britain's Public Libraries Disappearing?",
    description: 'England has lost over 770 library branches since 2010 — a 17% fall. Book issues have dropped 42%. But visits are recovering post-COVID, and libraries have expanded digital services. The question is whether a reimagined library can survive further council budget cuts.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/libraries',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Are Britain's Public Libraries Disappearing?",
    description: 'England has lost over 770 library branches since 2010 — a 17% fall. Book issues have dropped 42%. But visits are recovering post-COVID, and libraries have expanded digital services. The question is whether a reimagined library can survive further council budget cuts.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/libraries',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

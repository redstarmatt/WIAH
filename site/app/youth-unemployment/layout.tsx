import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What are young people doing instead of working?',
  description: 'One in eight young people aged 16&ndash;24 is NEET &mdash; not in education, employment or training &mdash; with the figure rising since the pandemic and disproportionately affecting young people with disabilities, care leavers, and those without qualifications.',
  openGraph: {
    title: 'What are young people doing instead of working?',
    description: 'One in eight young people aged 16&ndash;24 is NEET &mdash; not in education, employment or training &mdash; with the figure rising since the pandemic and disproportionately affecting young people with disabilities, care leavers, and those without qualifications.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/youth-unemployment',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What are young people doing instead of working?',
    description: 'One in eight young people aged 16&ndash;24 is NEET &mdash; not in education, employment or training &mdash; with the figure rising since the pandemic and disproportionately affecting young people with disabilities, care leavers, and those without qualifications.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/youth-unemployment',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

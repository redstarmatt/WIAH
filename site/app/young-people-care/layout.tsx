import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What happens to children who grow up in the care system?',
  description: '83,840 children were in local authority care in England in 2023 — up 38% since 2009. Only 6% of care leavers go to university, versus 43% of all young people. One in three care leavers is not in education, employment or training at age 19–21.',
  openGraph: {
    title: 'What happens to children who grow up in the care system?',
    description: '83,840 children were in local authority care in England in 2023 — up 38% since 2009. Only 6% of care leavers go to university, versus 43% of all young people. One in three care leavers is not in education, employment or training at age 19–21.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/young-people-care',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What happens to children who grow up in the care system?',
    description: '83,840 children were in local authority care in England in 2023 — up 38% since 2009. Only 6% of care leavers go to university, versus 43% of all young people. One in three care leavers is not in education, employment or training at age 19–21.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/young-people-care',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

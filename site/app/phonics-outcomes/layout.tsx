import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Has Phonics Teaching Made British Children Better Readers?",
  description: "79% of Year 1 pupils in England now meet the expected standard in the phonics check — up from 58% in 2012. The attainment gap between disadvantaged pupils and their peers has narrowed by 7 percentage points, though a 14-point gap persists.",
  openGraph: {
    title: "Has Phonics Teaching Made British Children Better Readers?",
    description: "79% of Year 1 pupils in England now meet the expected standard in the phonics check — up from 58% in 2012. The attainment gap between disadvantaged pupils and their peers has narrowed by 7 percentage points, though a 14-point gap persists.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/phonics-outcomes',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Has Phonics Teaching Made British Children Better Readers?",
    description: "79% of Year 1 pupils in England now meet the expected standard in the phonics check — up from 58% in 2012. The attainment gap between disadvantaged pupils and their peers has narrowed by 7 percentage points, though a 14-point gap persists.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/phonics-outcomes',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

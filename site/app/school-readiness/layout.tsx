import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Many Children Start School Not Ready to Learn?",
  description: "67.7% of five-year-olds in England achieve a good level of development — but the gap between disadvantaged children and their peers has widened to 19 percentage points since the pandemic erased a decade of progress.",
  openGraph: {
    title: "How Many Children Start School Not Ready to Learn?",
    description: "67.7% of five-year-olds in England achieve a good level of development — but the gap between disadvantaged children and their peers has widened to 19 percentage points since the pandemic erased a decade of progress.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/school-readiness',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Many Children Start School Not Ready to Learn?",
    description: "67.7% of five-year-olds in England achieve a good level of development — but the gap between disadvantaged children and their peers has widened to 19 percentage points since the pandemic erased a decade of progress.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/school-readiness',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

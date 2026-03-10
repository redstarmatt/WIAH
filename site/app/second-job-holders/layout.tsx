import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Many Britons Have More Than One Job?",
  description: "1.21 million workers in the UK now hold multiple jobs — a record. Real wage pressure is forcing people to take second jobs. 11.2% of public sector workers — including teachers and nurses — supplement their income elsewhere.",
  openGraph: {
    title: "How Many Britons Have More Than One Job?",
    description: "1.21 million workers in the UK now hold multiple jobs — a record. Real wage pressure is forcing people to take second jobs. 11.2% of public sector workers — including teachers and nurses — supplement their income elsewhere.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/second-job-holders',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Many Britons Have More Than One Job?",
    description: "1.21 million workers in the UK now hold multiple jobs — a record. Real wage pressure is forcing people to take second jobs. 11.2% of public sector workers — including teachers and nurses — supplement their income elsewhere.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/second-job-holders',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Often Are Planning Refusals Overturned on Appeal?",
  description: "Planning inspectors allowed 31% of appeals against refusal in England last year — up from 27% — indicating that local authorities are refusing developments that planning policy would support, often driven by community opposition rather than policy.",
  openGraph: {
    title: "How Often Are Planning Refusals Overturned on Appeal?",
    description: "Planning inspectors allowed 31% of appeals against refusal in England last year — up from 27% — indicating that local authorities are refusing developments that planning policy would support, often driven by community opposition rather than policy.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/planning-appeals',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Often Are Planning Refusals Overturned on Appeal?",
    description: "Planning inspectors allowed 31% of appeals against refusal in England last year — up from 27% — indicating that local authorities are refusing developments that planning policy would support, often driven by community opposition rather than policy.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/planning-appeals',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

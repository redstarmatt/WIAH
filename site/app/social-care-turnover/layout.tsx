import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Does Social Care Lose a Third of Its Workers Every Year?",
  description: "The social care workforce turnover rate is 28.3% — twice the NHS average. 152,000 posts are unfilled on any given day in England. Low pay, heavy workload and poor career development drive the exodus.",
  openGraph: {
    title: "Why Does Social Care Lose a Third of Its Workers Every Year?",
    description: "The social care workforce turnover rate is 28.3% — twice the NHS average. 152,000 posts are unfilled on any given day in England. Low pay, heavy workload and poor career development drive the exodus.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/social-care-turnover',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Does Social Care Lose a Third of Its Workers Every Year?",
    description: "The social care workforce turnover rate is 28.3% — twice the NHS average. 152,000 posts are unfilled on any given day in England. Low pay, heavy workload and poor career development drive the exodus.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/social-care-turnover',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

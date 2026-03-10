import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Bowel Cancer Screening Finally Working?",
  description: "Uptake of bowel cancer screening has risen to 67% following the switch to the more acceptable FIT test. Over half of screen-detected cancers are now caught at early stages.",
  openGraph: {
    title: "Is Bowel Cancer Screening Finally Working?",
    description: "Uptake of bowel cancer screening has risen to 67% following the switch to the more acceptable FIT test. Over half of screen-detected cancers are now caught at early stages.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/bowel-screening',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Bowel Cancer Screening Finally Working?",
    description: "Uptake of bowel cancer screening has risen to 67% following the switch to the more acceptable FIT test. Over half of screen-detected cancers are now caught at early stages.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/bowel-screening',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

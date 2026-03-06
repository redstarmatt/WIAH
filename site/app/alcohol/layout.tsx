import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain Actually Drinking Less?',
  description: 'Alcohol-related hospital admissions have risen to 980,000 a year — up 17% since 2010. Over 8,000 people die from alcohol-specific causes each year. Per-capita consumption has fallen since the 2004 peak but remains one of the highest in Europe. Alcohol costs the NHS £3.5 billion annually.',
  openGraph: {
    title: 'Is Britain Actually Drinking Less?',
    description: 'Alcohol-related hospital admissions have risen to 980,000 a year — up 17% since 2010. Over 8,000 people die from alcohol-specific causes each year. Per-capita consumption has fallen since the 2004 peak but remains one of the highest in Europe. Alcohol costs the NHS £3.5 billion annually.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/alcohol',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain Actually Drinking Less?',
    description: 'Alcohol-related hospital admissions have risen to 980,000 a year — up 17% since 2010. Over 8,000 people die from alcohol-specific causes each year. Per-capita consumption has fallen since the 2004 peak but remains one of the highest in Europe. Alcohol costs the NHS £3.5 billion annually.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/alcohol',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

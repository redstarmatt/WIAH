import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many People Are Sleeping Rough in Britain?',
  description: '3,898 people were counted sleeping rough in England on a single autumn night in 2023 — up 27% in a year. The real figure is estimated to be three to five times higher. Rough sleeping rose 120% between 2010 and 2017 and, despite a brief COVID-era fall, is rising again. Around 270,000 households are recognised as homeless by councils each year.',
  openGraph: {
    title: 'How Many People Are Sleeping Rough in Britain?',
    description: '3,898 people were counted sleeping rough in England on a single autumn night in 2023 — up 27% in a year. The real figure is estimated to be three to five times higher. Rough sleeping rose 120% between 2010 and 2017 and, despite a brief COVID-era fall, is rising again. Around 270,000 households are recognised as homeless by councils each year.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/rough-sleeping',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many People Are Sleeping Rough in Britain?',
    description: '3,898 people were counted sleeping rough in England on a single autumn night in 2023 — up 27% in a year. The real figure is estimated to be three to five times higher. Rough sleeping rose 120% between 2010 and 2017 and, despite a brief COVID-era fall, is rising again. Around 270,000 households are recognised as homeless by councils each year.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/rough-sleeping',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

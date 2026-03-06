import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are People in Britain Actually Happy?',
  description: 'Life satisfaction has fallen below pre-pandemic levels, anxiety is higher than at any time since records began, and one in four adults now feels lonely. After peaking in 2018/19, British wellbeing has been in steady decline.',
  openGraph: {
    title: 'Are People in Britain Actually Happy?',
    description: 'Life satisfaction has fallen below pre-pandemic levels, anxiety is higher than at any time since records began, and one in four adults now feels lonely. After peaking in 2018/19, British wellbeing has been in steady decline.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/wellbeing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are People in Britain Actually Happy?',
    description: 'Life satisfaction has fallen below pre-pandemic levels, anxiety is higher than at any time since records began, and one in four adults now feels lonely. After peaking in 2018/19, British wellbeing has been in steady decline.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/wellbeing',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

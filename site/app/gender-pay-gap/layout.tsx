import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Wide Is Britain&apos;s Gender Pay Gap?',
  description: 'The UK gender pay gap stands at 14.3% for full-time workers &mdash; women earn 86p for every &pound;1 earned by men. For all workers (including part-time), the gap rises to 19.7%. The gap persists in every sector and widens sharply after childbirth. At current rates of change, the gap will not close until 2050.',
  openGraph: {
    title: 'How Wide Is Britain&apos;s Gender Pay Gap?',
    description: 'The UK gender pay gap stands at 14.3% for full-time workers &mdash; women earn 86p for every &pound;1 earned by men. For all workers (including part-time), the gap rises to 19.7%. The gap persists in every sector and widens sharply after childbirth. At current rates of change, the gap will not close until 2050.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/gender-pay-gap',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Wide Is Britain&apos;s Gender Pay Gap?',
    description: 'The UK gender pay gap stands at 14.3% for full-time workers &mdash; women earn 86p for every &pound;1 earned by men. For all workers (including part-time), the gap rises to 19.7%. The gap persists in every sector and widens sharply after childbirth. At current rates of change, the gap will not close until 2050.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/gender-pay-gap',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

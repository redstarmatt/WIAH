import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is the Safety Net Actually Catching People?',
  description: '6.78 million people now claim Universal Credit &mdash; nearly three times the 2018 level. Alongside a surge in PIP recipients and food bank use, Britain&apos;s safety net is catching more people, but not necessarily catching them better.',
  openGraph: {
    title: 'Is the Safety Net Actually Catching People?',
    description: '6.78 million people now claim Universal Credit &mdash; nearly three times the 2018 level. Alongside a surge in PIP recipients and food bank use, Britain&apos;s safety net is catching more people, but not necessarily catching them better.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/benefits',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is the Safety Net Actually Catching People?',
    description: '6.78 million people now claim Universal Credit &mdash; nearly three times the 2018 level. Alongside a surge in PIP recipients and food bank use, Britain&apos;s safety net is catching more people, but not necessarily catching them better.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/benefits',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is the North&ndash;South Divide Actually Getting Worse?',
  description: 'London&apos;s economic output per person is 178&percnt; of the UK average; the North East produces 65&percnt;. This 113-point gap has widened, not narrowed, since 2015 despite successive &lsquo;levelling up&rsquo; commitments. People in the poorest areas of England can expect 21 fewer years of healthy life than those in the wealthiest.',
  openGraph: {
    title: 'Is the North&ndash;South Divide Actually Getting Worse?',
    description: 'London&apos;s economic output per person is 178&percnt; of the UK average; the North East produces 65&percnt;. This 113-point gap has widened, not narrowed, since 2015 despite successive &lsquo;levelling up&rsquo; commitments. People in the poorest areas of England can expect 21 fewer years of healthy life than those in the wealthiest.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/regional-inequality',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is the North&ndash;South Divide Actually Getting Worse?',
    description: 'London&apos;s economic output per person is 178&percnt; of the UK average; the North East produces 65&percnt;. This 113-point gap has widened, not narrowed, since 2015 despite successive &lsquo;levelling up&rsquo; commitments. People in the poorest areas of England can expect 21 fewer years of healthy life than those in the wealthiest.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/regional-inequality',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

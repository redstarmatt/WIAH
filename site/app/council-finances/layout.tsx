import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Britain&apos;s Local Councils Going Bankrupt?',
  description: '12 English councils have issued Section 114 notices (effective bankruptcy) since 2018, including Birmingham, Thurrock, and Woking. The local government funding gap is &pound;4 billion per year. Council tax has risen 40% in real terms since 2010 while services have been cut by 25%. 1 in 6 councils are at risk of financial failure.',
  openGraph: {
    title: 'Are Britain&apos;s Local Councils Going Bankrupt?',
    description: '12 English councils have issued Section 114 notices (effective bankruptcy) since 2018, including Birmingham, Thurrock, and Woking. The local government funding gap is &pound;4 billion per year. Council tax has risen 40% in real terms since 2010 while services have been cut by 25%. 1 in 6 councils are at risk of financial failure.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/council-finances',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Britain&apos;s Local Councils Going Bankrupt?',
    description: '12 English councils have issued Section 114 notices (effective bankruptcy) since 2018, including Birmingham, Thurrock, and Woking. The local government funding gap is &pound;4 billion per year. Council tax has risen 40% in real terms since 2010 while services have been cut by 25%. 1 in 6 councils are at risk of financial failure.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/council-finances',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

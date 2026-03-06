import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Ethnic Minorities More Likely to Live in Poverty?',
  description: '46% of people from ethnic minority backgrounds live in poverty — more than double the 21% rate for white British people — with Bangladeshi and Pakistani households at highest risk.',
  openGraph: {
    title: 'Are Ethnic Minorities More Likely to Live in Poverty?',
    description: '46% of people from ethnic minority backgrounds live in poverty — more than double the 21% rate for white British people — with Bangladeshi and Pakistani households at highest risk.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/ethnic-minority-poverty',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Ethnic Minorities More Likely to Live in Poverty?',
    description: '46% of people from ethnic minority backgrounds live in poverty — more than double the 21% rate for white British people — with Bangladeshi and Pakistani households at highest risk.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/ethnic-minority-poverty',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

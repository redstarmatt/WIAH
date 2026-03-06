import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Happened to Britain&apos;s Self-Employed?',
  description: 'Self-employment peaked at 4.93 million in 2019 then collapsed: 700,000 people left the sector during COVID-19 and have not returned. The self-employed earn 40&percnt; less per hour than employees on a median basis, have no entitlement to sick pay, holiday pay, or employer pension contributions, and were excluded from furlough. IR35 reforms have pushed many into a grey zone between employment and self-employment.',
  openGraph: {
    title: 'What Happened to Britain&apos;s Self-Employed?',
    description: 'Self-employment peaked at 4.93 million in 2019 then collapsed: 700,000 people left the sector during COVID-19 and have not returned. The self-employed earn 40&percnt; less per hour than employees on a median basis, have no entitlement to sick pay, holiday pay, or employer pension contributions, and were excluded from furlough. IR35 reforms have pushed many into a grey zone between employment and self-employment.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/self-employment',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Happened to Britain&apos;s Self-Employed?',
    description: 'Self-employment peaked at 4.93 million in 2019 then collapsed: 700,000 people left the sector during COVID-19 and have not returned. The self-employed earn 40&percnt; less per hour than employees on a median basis, have no entitlement to sick pay, holiday pay, or employer pension contributions, and were excluded from furlough. IR35 reforms have pushed many into a grey zone between employment and self-employment.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/self-employment',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

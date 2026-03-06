import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can Every Girl in Britain Afford to Have a Period?',
  description: "One in five girls aged 14–21 has struggled to afford period products in the past year, according to Plan International. Period poverty affects school attendance: around 137,000 girls in the UK missed school due to period poverty in 2017. The government's Period Products Scheme provides free products in schools and colleges, but uptake remains patchy and many are still going without.",
  openGraph: {
    title: 'Can Every Girl in Britain Afford to Have a Period?',
    description: "One in five girls aged 14–21 has struggled to afford period products in the past year, according to Plan International. Period poverty affects school attendance: around 137,000 girls in the UK missed school due to period poverty in 2017. The government's Period Products Scheme provides free products in schools and colleges, but uptake remains patchy and many are still going without.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/period-poverty',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can Every Girl in Britain Afford to Have a Period?',
    description: "One in five girls aged 14–21 has struggled to afford period products in the past year, according to Plan International. Period poverty affects school attendance: around 137,000 girls in the UK missed school due to period poverty in 2017. The government's Period Products Scheme provides free products in schools and colleges, but uptake remains patchy and many are still going without.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/period-poverty',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is a Degree Actually Worth the Debt?',
  description: 'Average student loan debt at graduation reached &pound;45,800 in 2022/23. Under Plan 5 (from 2023), graduates repay for 40 years. 72% of graduates under Plan 2 never repay their loan in full. Universities face a real-terms funding cut as the &pound;9,250 fee has been frozen since 2017.',
  openGraph: {
    title: 'Is a Degree Actually Worth the Debt?',
    description: 'Average student loan debt at graduation reached &pound;45,800 in 2022/23. Under Plan 5 (from 2023), graduates repay for 40 years. 72% of graduates under Plan 2 never repay their loan in full. Universities face a real-terms funding cut as the &pound;9,250 fee has been frozen since 2017.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/university-funding',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is a Degree Actually Worth the Debt?',
    description: 'Average student loan debt at graduation reached &pound;45,800 in 2022/23. Under Plan 5 (from 2023), graduates repay for 40 years. 72% of graduates under Plan 2 never repay their loan in full. Universities face a real-terms funding cut as the &pound;9,250 fee has been frozen since 2017.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/university-funding',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

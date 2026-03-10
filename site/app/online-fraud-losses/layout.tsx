import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Much Do Britons Lose to Online Fraud?",
  description: "Online fraud cost UK consumers £1.17 billion in 2023 — a record. Investment fraud is the fastest-growing category. 125,000 online shopping fraud reports were filed — more than double the 2018 figure.",
  openGraph: {
    title: "How Much Do Britons Lose to Online Fraud?",
    description: "Online fraud cost UK consumers £1.17 billion in 2023 — a record. Investment fraud is the fastest-growing category. 125,000 online shopping fraud reports were filed — more than double the 2018 figure.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/online-fraud-losses',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Much Do Britons Lose to Online Fraud?",
    description: "Online fraud cost UK consumers £1.17 billion in 2023 — a record. Investment fraud is the fastest-growing category. 125,000 online shopping fraud reports were filed — more than double the 2018 figure.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/online-fraud-losses',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

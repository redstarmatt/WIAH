import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is the NHS Recovering the Cost of Treating Overseas Visitors?",
  description: "The NHS recovered £600 million from overseas treatment costs in 2023/24 — up from £295 million in 2017. The government's target is £500 million minimum. Around £25 million in debts are written off each year.",
  openGraph: {
    title: "Is the NHS Recovering the Cost of Treating Overseas Visitors?",
    description: "The NHS recovered £600 million from overseas treatment costs in 2023/24 — up from £295 million in 2017. The government's target is £500 million minimum. Around £25 million in debts are written off each year.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-overseas-cost-recovery',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is the NHS Recovering the Cost of Treating Overseas Visitors?",
    description: "The NHS recovered £600 million from overseas treatment costs in 2023/24 — up from £295 million in 2017. The government's target is £500 million minimum. Around £25 million in debts are written off each year.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-overseas-cost-recovery',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

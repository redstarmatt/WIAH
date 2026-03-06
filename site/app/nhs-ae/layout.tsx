import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Bad Are NHS A&amp;E Waiting Times?',
  description: 'Only 70% of patients are seen within 4 hours in major A&amp;E departments — the target is 95%. This target has not been consistently met since 2015. Over 300,000 patients waited more than 12 hours in 2023/24. 24 million people attended A&amp;E in 2022/23 — the highest ever.',
  openGraph: {
    title: 'How Bad Are NHS A&amp;E Waiting Times?',
    description: 'Only 70% of patients are seen within 4 hours in major A&amp;E departments — the target is 95%. This target has not been consistently met since 2015. Over 300,000 patients waited more than 12 hours in 2023/24. 24 million people attended A&amp;E in 2022/23 — the highest ever.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-ae',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Bad Are NHS A&amp;E Waiting Times?',
    description: 'Only 70% of patients are seen within 4 hours in major A&amp;E departments — the target is 95%. This target has not been consistently met since 2015. Over 300,000 patients waited more than 12 hours in 2023/24. 24 million people attended A&amp;E in 2022/23 — the highest ever.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-ae',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

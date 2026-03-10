import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Are 370,000 People Living with Undiagnosed Dementia?",
  description: "The dementia diagnosis rate has fallen below the NHS 66.7% target to 62.2%. An estimated 370,000 people are living with undiagnosed dementia — missing out on treatment, support and legal planning.",
  openGraph: {
    title: "Why Are 370,000 People Living with Undiagnosed Dementia?",
    description: "The dementia diagnosis rate has fallen below the NHS 66.7% target to 62.2%. An estimated 370,000 people are living with undiagnosed dementia — missing out on treatment, support and legal planning.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/dementia-diagnosis-rate',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Are 370,000 People Living with Undiagnosed Dementia?",
    description: "The dementia diagnosis rate has fallen below the NHS 66.7% target to 62.2%. An estimated 370,000 people are living with undiagnosed dementia — missing out on treatment, support and legal planning.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/dementia-diagnosis-rate',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

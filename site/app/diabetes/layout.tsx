import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain&apos;s Diabetes Epidemic Under Control?',
  description: '5.6 million people in the UK have diabetes &mdash; 4.4 million diagnosed, 1.2 million undiagnosed. Type 2 diabetes has tripled since the 1990s. The NHS spends &pound;10 billion a year on diabetes care &mdash; 10% of its total budget. But 1.2 million people are at high risk of developing Type 2 diabetes and are on the NHS Diabetes Prevention Programme.',
  openGraph: {
    title: 'Is Britain&apos;s Diabetes Epidemic Under Control?',
    description: '5.6 million people in the UK have diabetes &mdash; 4.4 million diagnosed, 1.2 million undiagnosed. Type 2 diabetes has tripled since the 1990s. The NHS spends &pound;10 billion a year on diabetes care &mdash; 10% of its total budget. But 1.2 million people are at high risk of developing Type 2 diabetes and are on the NHS Diabetes Prevention Programme.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/diabetes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain&apos;s Diabetes Epidemic Under Control?',
    description: '5.6 million people in the UK have diabetes &mdash; 4.4 million diagnosed, 1.2 million undiagnosed. Type 2 diabetes has tripled since the 1990s. The NHS spends &pound;10 billion a year on diabetes care &mdash; 10% of its total budget. But 1.2 million people are at high risk of developing Type 2 diabetes and are on the NHS Diabetes Prevention Programme.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/diabetes',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

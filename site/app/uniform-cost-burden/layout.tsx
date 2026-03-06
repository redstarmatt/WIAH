import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Much Are Families Spending on School Uniforms?',
  description: 'Average annual school uniform cost exceeds 300 pounds per secondary pupil, with branded items a major driver.',
  openGraph: {
    title: 'How Much Are Families Spending on School Uniforms?',
    description: 'Average annual school uniform cost exceeds 300 pounds per secondary pupil, with branded items a major driver.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/uniform-cost-burden',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much Are Families Spending on School Uniforms?',
    description: 'Average annual school uniform cost exceeds 300 pounds per secondary pupil, with branded items a major driver.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/uniform-cost-burden',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

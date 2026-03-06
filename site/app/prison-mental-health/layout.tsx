import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What is the state of mental health in British prisons?',
  description: '70% of prisoners have at least two mental health diagnoses. Self-harm incidents have risen 208% since 2012, to over 74,000 per year. There were 86 apparent self-inflicted deaths in custody in 2022/23.',
  openGraph: {
    title: 'What is the state of mental health in British prisons?',
    description: '70% of prisoners have at least two mental health diagnoses. Self-harm incidents have risen 208% since 2012, to over 74,000 per year. There were 86 apparent self-inflicted deaths in custody in 2022/23.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/prison-mental-health',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is the state of mental health in British prisons?',
    description: '70% of prisoners have at least two mental health diagnoses. Self-harm incidents have risen 208% since 2012, to over 74,000 per year. There were 86 apparent self-inflicted deaths in custody in 2022/23.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/prison-mental-health',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

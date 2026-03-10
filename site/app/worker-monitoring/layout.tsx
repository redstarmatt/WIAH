import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Your Boss Watching Your Every Move?",
  description: "60% of UK workers are now subject to automated monitoring — up from 34% before the pandemic. 312 employment tribunal cases cited algorithmic management in 2023. ICO guidance on lawful monitoring is struggling to keep pace.",
  openGraph: {
    title: "Is Your Boss Watching Your Every Move?",
    description: "60% of UK workers are now subject to automated monitoring — up from 34% before the pandemic. 312 employment tribunal cases cited algorithmic management in 2023. ICO guidance on lawful monitoring is struggling to keep pace.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/worker-monitoring',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Your Boss Watching Your Every Move?",
    description: "60% of UK workers are now subject to automated monitoring — up from 34% before the pandemic. 312 employment tribunal cases cited algorithmic management in 2023. ICO guidance on lawful monitoring is struggling to keep pace.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/worker-monitoring',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

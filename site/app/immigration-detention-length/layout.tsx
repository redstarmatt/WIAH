import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `How Long Are Migrants Held in Detention?`,
  description: '26,297 people entered immigration detention in 2024. Average detention stays have risen to 38 days, with mental health and self-harm rates in detention centres significantly above community rates.',
  openGraph: {
    title: `How Long Are Migrants Held in Detention?`,
    description: '26,297 people entered immigration detention in 2024. Average detention stays have risen to 38 days, with mental health and self-harm rates in detention centres significantly above community rates.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/immigration-detention-length',
  },
  twitter: {
    card: 'summary_large_image',
    title: `How Long Are Migrants Held in Detention?`,
    description: '26,297 people entered immigration detention in 2024. Average detention stays have risen to 38 days, with mental health and self-harm rates in detention centres significantly above community rates.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/immigration-detention-length',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

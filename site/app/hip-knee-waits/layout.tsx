import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Are 780,000 People Waiting for a Hip or Knee Replacement?",
  description: "The combined hip and knee replacement backlog stands at 780,000 — up from 170,000 before COVID. The median wait is now over a year. Pain, immobility and loss of employment are consequences of the delay.",
  openGraph: {
    title: "Why Are 780,000 People Waiting for a Hip or Knee Replacement?",
    description: "The combined hip and knee replacement backlog stands at 780,000 — up from 170,000 before COVID. The median wait is now over a year. Pain, immobility and loss of employment are consequences of the delay.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/hip-knee-waits',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Are 780,000 People Waiting for a Hip or Knee Replacement?",
    description: "The combined hip and knee replacement backlog stands at 780,000 — up from 170,000 before COVID. The median wait is now over a year. Pain, immobility and loss of employment are consequences of the delay.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/hip-knee-waits',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

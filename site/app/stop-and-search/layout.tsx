import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Stop and Search Being Used Fairly?",
  description: "1.06 million stop and searches took place in England and Wales in 2023 — up 72% since 2016. Black people are stopped at a rate seven times higher than white people, up from five times in 2018.",
  openGraph: {
    title: "Is Stop and Search Being Used Fairly?",
    description: "1.06 million stop and searches took place in England and Wales in 2023 — up 72% since 2016. Black people are stopped at a rate seven times higher than white people, up from five times in 2018.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/stop-and-search',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Stop and Search Being Used Fairly?",
    description: "1.06 million stop and searches took place in England and Wales in 2023 — up 72% since 2016. Black people are stopped at a rate seven times higher than white people, up from five times in 2018.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/stop-and-search',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

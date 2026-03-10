import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Common Is Honour-Based Abuse in Britain?",
  description: "3,908 honour-based abuse crimes were recorded in 2023 — up 81% since 2016, driven partly by better recording but also a real increase. The majority of victims are women and girls.",
  openGraph: {
    title: "How Common Is Honour-Based Abuse in Britain?",
    description: "3,908 honour-based abuse crimes were recorded in 2023 — up 81% since 2016, driven partly by better recording but also a real increase. The majority of victims are women and girls.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/honour-based-abuse',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Common Is Honour-Based Abuse in Britain?",
    description: "3,908 honour-based abuse crimes were recorded in 2023 — up 81% since 2016, driven partly by better recording but also a real increase. The majority of victims are women and girls.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/honour-based-abuse',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Is Social Media Actually Doing to Us?',
  description: "40&percnt; of girls aged 11–15 experience cyberbullying online. Teen girls' rates of depression have doubled since 2012 — a period that precisely tracks mass smartphone and social media adoption. The Online Safety Act 2023 gives Ofcom powers to fine platforms up to 10&percnt; of global revenue, but no major platform has yet faced a meaningful penalty.",
  openGraph: {
    title: 'What Is Social Media Actually Doing to Us?',
    description: "40&percnt; of girls aged 11–15 experience cyberbullying online. Teen girls' rates of depression have doubled since 2012 — a period that precisely tracks mass smartphone and social media adoption. The Online Safety Act 2023 gives Ofcom powers to fine platforms up to 10&percnt; of global revenue, but no major platform has yet faced a meaningful penalty.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/social-media-harm',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Social Media Actually Doing to Us?',
    description: "40&percnt; of girls aged 11–15 experience cyberbullying online. Teen girls' rates of depression have doubled since 2012 — a period that precisely tracks mass smartphone and social media adoption. The Online Safety Act 2023 gives Ofcom powers to fine platforms up to 10&percnt; of global revenue, but no major platform has yet faced a meaningful penalty.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/social-media-harm',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

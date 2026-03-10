import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Are So Many Over-50s Out of Work?",
  description: "26.4% of people aged 50–64 are economically inactive — up from 22.8% in 2019. 58% cite long-term ill health as the reason, driven by musculoskeletal conditions and mental health. Early retirement of experienced workers costs the economy billions.",
  openGraph: {
    title: "Why Are So Many Over-50s Out of Work?",
    description: "26.4% of people aged 50–64 are economically inactive — up from 22.8% in 2019. 58% cite long-term ill health as the reason, driven by musculoskeletal conditions and mental health. Early retirement of experienced workers costs the economy billions.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/over-50s-employment',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Are So Many Over-50s Out of Work?",
    description: "26.4% of people aged 50–64 are economically inactive — up from 22.8% in 2019. 58% cite long-term ill health as the reason, driven by musculoskeletal conditions and mental health. Early retirement of experienced workers costs the economy billions.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/over-50s-employment',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

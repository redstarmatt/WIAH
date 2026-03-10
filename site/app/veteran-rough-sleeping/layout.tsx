import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Are Veterans Still Sleeping Rough?",
  description: "320 veterans were found sleeping rough in England on any given night in 2023 — down from 400 in 2018. Op FORTITUDE and specialist veteran housing pathways are making progress, but hidden homelessness among veterans is thought to be much higher.",
  openGraph: {
    title: "Are Veterans Still Sleeping Rough?",
    description: "320 veterans were found sleeping rough in England on any given night in 2023 — down from 400 in 2018. Op FORTITUDE and specialist veteran housing pathways are making progress, but hidden homelessness among veterans is thought to be much higher.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/veteran-rough-sleeping',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Are Veterans Still Sleeping Rough?",
    description: "320 veterans were found sleeping rough in England on any given night in 2023 — down from 400 in 2018. Op FORTITUDE and specialist veteran housing pathways are making progress, but hidden homelessness among veterans is thought to be much higher.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/veteran-rough-sleeping',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

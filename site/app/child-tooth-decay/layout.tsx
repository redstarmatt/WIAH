import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Do So Many Children Still Have Rotten Teeth?",
  description: "23.4% of five-year-olds in England have tooth decay — one of the highest rates in Western Europe. 42,000 children per year are admitted to hospital for tooth extractions under general anaesthetic.",
  openGraph: {
    title: "Why Do So Many Children Still Have Rotten Teeth?",
    description: "23.4% of five-year-olds in England have tooth decay — one of the highest rates in Western Europe. 42,000 children per year are admitted to hospital for tooth extractions under general anaesthetic.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/child-tooth-decay',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Do So Many Children Still Have Rotten Teeth?",
    description: "23.4% of five-year-olds in England have tooth decay — one of the highest rates in Western Europe. 42,000 children per year are admitted to hospital for tooth extractions under general anaesthetic.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/child-tooth-decay',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

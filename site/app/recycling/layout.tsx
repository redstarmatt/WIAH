import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Where Does Your Recycling Actually Go? | What is actually happening',
  description: "England's recycling rate has been stuck below 44% for a decade — and whether your sorted waste gets recycled depends enormously on which council you live in.",
  openGraph: {
    title: 'Where Does Your Recycling Actually Go?',
    description: "England's recycling rate has been stuck below 44% for a decade — and whether your sorted waste gets recycled depends enormously on which council you live in.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/recycling',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Where Does Your Recycling Actually Go?',
    description: "England's recycling rate has been stuck below 44% for a decade — and whether your sorted waste gets recycled depends enormously on which council you live in.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/recycling',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

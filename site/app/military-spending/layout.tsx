import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain Spending Enough on Defence?',
  description: "UK defence spending is 2.3&percnt; of GDP — meeting NATO's 2&percnt; target — but the British Army is at its smallest since the Napoleonic Wars at 73,000 regular soldiers, total armed forces have fallen from 212,000 in 2000 to approximately 148,000, and senior defence figures warn that equipment stockpiles are at &ldquo;dangerously low&rdquo; levels in the context of rising threats from Russia and other state actors.",
  openGraph: {
    title: 'Is Britain Spending Enough on Defence?',
    description: "UK defence spending is 2.3&percnt; of GDP — meeting NATO's 2&percnt; target — but the British Army is at its smallest since the Napoleonic Wars at 73,000 regular soldiers, total armed forces have fallen from 212,000 in 2000 to approximately 148,000, and senior defence figures warn that equipment stockpiles are at &ldquo;dangerously low&rdquo; levels in the context of rising threats from Russia and other state actors.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/military-spending',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain Spending Enough on Defence?',
    description: "UK defence spending is 2.3&percnt; of GDP — meeting NATO's 2&percnt; target — but the British Army is at its smallest since the Napoleonic Wars at 73,000 regular soldiers, total armed forces have fallen from 212,000 in 2000 to approximately 148,000, and senior defence figures warn that equipment stockpiles are at &ldquo;dangerously low&rdquo; levels in the context of rising threats from Russia and other state actors.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/military-spending',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

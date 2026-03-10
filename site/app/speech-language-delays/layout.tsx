import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Are So Many Children Starting School Unable to Talk Properly?",
  description: "17.5% of children in England now start school with speech and language delays — up from 14% before the pandemic. 38% of children referred for speech therapy wait more than 18 weeks. The speech and language therapy workforce is chronically short.",
  openGraph: {
    title: "Why Are So Many Children Starting School Unable to Talk Properly?",
    description: "17.5% of children in England now start school with speech and language delays — up from 14% before the pandemic. 38% of children referred for speech therapy wait more than 18 weeks. The speech and language therapy workforce is chronically short.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/speech-language-delays',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Are So Many Children Starting School Unable to Talk Properly?",
    description: "17.5% of children in England now start school with speech and language delays — up from 14% before the pandemic. 38% of children referred for speech therapy wait more than 18 weeks. The speech and language therapy workforce is chronically short.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/speech-language-delays',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Many People Die from Air Pollution in Britain?",
  description: "Air pollution causes an estimated 43,000 premature deaths in the UK each year — still placing Britain among the worst in Europe. 43% of English local authorities breach legal nitrogen dioxide limits.",
  openGraph: {
    title: "How Many People Die from Air Pollution in Britain?",
    description: "Air pollution causes an estimated 43,000 premature deaths in the UK each year — still placing Britain among the worst in Europe. 43% of English local authorities breach legal nitrogen dioxide limits.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/air-quality-deaths',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Many People Die from Air Pollution in Britain?",
    description: "Air pollution causes an estimated 43,000 premature deaths in the UK each year — still placing Britain among the worst in Europe. 43% of English local authorities breach legal nitrogen dioxide limits.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/air-quality-deaths',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

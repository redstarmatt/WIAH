import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "What Has Happened to Britain's Foreign Aid?",
  description: "The UK cut overseas development assistance from 0.7&percnt; to 0.5&percnt; of GNI in 2021, withdrawing approximately £4 billion annually from programmes fighting malaria, famine, and displacement. Simultaneously, the government classified £3.5 billion of the remaining aid budget as &ldquo;in-donor asylum costs&rdquo; — money spent in the UK on asylum processing — leaving dramatically less for the world's poorest.",
  openGraph: {
    title: "What Has Happened to Britain's Foreign Aid?",
    description: "The UK cut overseas development assistance from 0.7&percnt; to 0.5&percnt; of GNI in 2021, withdrawing approximately £4 billion annually from programmes fighting malaria, famine, and displacement. Simultaneously, the government classified £3.5 billion of the remaining aid budget as &ldquo;in-donor asylum costs&rdquo; — money spent in the UK on asylum processing — leaving dramatically less for the world's poorest.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/foreign-aid',
  },
  twitter: {
    card: 'summary_large_image',
    title: "What Has Happened to Britain's Foreign Aid?",
    description: "The UK cut overseas development assistance from 0.7&percnt; to 0.5&percnt; of GNI in 2021, withdrawing approximately £4 billion annually from programmes fighting malaria, famine, and displacement. Simultaneously, the government classified £3.5 billion of the remaining aid budget as &ldquo;in-donor asylum costs&rdquo; — money spent in the UK on asylum processing — leaving dramatically less for the world's poorest.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/foreign-aid',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

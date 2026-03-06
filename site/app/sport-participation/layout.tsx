import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain Getting Off the Sofa?',
  description: 'One in four adults in England does fewer than 30 minutes of physical activity per week &mdash; classified as &ldquo;inactive&rdquo; by the Chief Medical Officer&apos;s guidelines. Activity levels have barely shifted since Sport England began measuring them in 2016, and the gap between the most and least deprived areas is widening.',
  openGraph: {
    title: 'Is Britain Getting Off the Sofa?',
    description: 'One in four adults in England does fewer than 30 minutes of physical activity per week &mdash; classified as &ldquo;inactive&rdquo; by the Chief Medical Officer&apos;s guidelines. Activity levels have barely shifted since Sport England began measuring them in 2016, and the gap between the most and least deprived areas is widening.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/sport-participation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain Getting Off the Sofa?',
    description: 'One in four adults in England does fewer than 30 minutes of physical activity per week &mdash; classified as &ldquo;inactive&rdquo; by the Chief Medical Officer&apos;s guidelines. Activity levels have barely shifted since Sport England began measuring them in 2016, and the gap between the most and least deprived areas is widening.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/sport-participation',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

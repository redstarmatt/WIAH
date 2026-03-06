import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is the Air in British Cities Actually Safe to Breathe?',
  description: 'Air pollution causes an estimated 36,000 premature deaths in the UK each year &mdash; more than obesity. London breaches WHO annual PM2.5 guidelines at most monitoring sites. NO&cent; levels fell sharply after the Ultra Low Emission Zone expanded in 2023. But 43% of English local authorities still breach legal nitrogen dioxide limits.',
  openGraph: {
    title: 'Is the Air in British Cities Actually Safe to Breathe?',
    description: 'Air pollution causes an estimated 36,000 premature deaths in the UK each year &mdash; more than obesity. London breaches WHO annual PM2.5 guidelines at most monitoring sites. NO&cent; levels fell sharply after the Ultra Low Emission Zone expanded in 2023. But 43% of English local authorities still breach legal nitrogen dioxide limits.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/air-quality',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is the Air in British Cities Actually Safe to Breathe?',
    description: 'Air pollution causes an estimated 36,000 premature deaths in the UK each year &mdash; more than obesity. London breaches WHO annual PM2.5 guidelines at most monitoring sites. NO&cent; levels fell sharply after the Ultra Low Emission Zone expanded in 2023. But 43% of English local authorities still breach legal nitrogen dioxide limits.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/air-quality',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

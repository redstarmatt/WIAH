import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is England&rsquo;s Sexual Health System Coping?',
  description: 'STI diagnoses have returned to pre-pandemic levels at 432,000 per year, while 40% of sexual health clinics have closed since 2014. Gonorrhoea rates have nearly doubled in a decade, with growing antibiotic resistance.',
  openGraph: {
    title: 'Is England&rsquo;s Sexual Health System Coping?',
    description: 'STI diagnoses have returned to pre-pandemic levels at 432,000 per year, while 40% of sexual health clinics have closed since 2014. Gonorrhoea rates have nearly doubled in a decade, with growing antibiotic resistance.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/sexual-health',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is England&rsquo;s Sexual Health System Coping?',
    description: 'STI diagnoses have returned to pre-pandemic levels at 432,000 per year, while 40% of sexual health clinics have closed since 2014. Gonorrhoea rates have nearly doubled in a decade, with growing antibiotic resistance.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/sexual-health',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

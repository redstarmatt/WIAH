import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Women Getting the Menopause Care They Need?',
  description: '84&percnt; of women with menopause symptoms say their quality of life is affected, yet HRT prescriptions &mdash; though rising &mdash; still reach fewer than 1 in 7 menopausal women, and 42&percnt; had to see their GP three or more times before getting treatment.',
  openGraph: {
    title: 'Are Women Getting the Menopause Care They Need?',
    description: '84&percnt; of women with menopause symptoms say their quality of life is affected, yet HRT prescriptions &mdash; though rising &mdash; still reach fewer than 1 in 7 menopausal women, and 42&percnt; had to see their GP three or more times before getting treatment.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/menopause-care',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Women Getting the Menopause Care They Need?',
    description: '84&percnt; of women with menopause symptoms say their quality of life is affected, yet HRT prescriptions &mdash; though rising &mdash; still reach fewer than 1 in 7 menopausal women, and 42&percnt; had to see their GP three or more times before getting treatment.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/menopause-care',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

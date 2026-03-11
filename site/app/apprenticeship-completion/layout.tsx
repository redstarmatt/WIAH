import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Do Apprenticeships Actually Get Finished?`,
  description: 'Only 52% of apprenticeships in England are completed. The high dropout rate represents significant waste of the £2.5bn Apprenticeship Levy and leaves learners without qualifications.',
  openGraph: {
    title: `Do Apprenticeships Actually Get Finished?`,
    description: 'Only 52% of apprenticeships in England are completed. The high dropout rate represents significant waste of the £2.5bn Apprenticeship Levy and leaves learners without qualifications.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/apprenticeship-completion',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Do Apprenticeships Actually Get Finished?`,
    description: 'Only 52% of apprenticeships in England are completed. The high dropout rate represents significant waste of the £2.5bn Apprenticeship Levy and leaves learners without qualifications.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/apprenticeship-completion',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

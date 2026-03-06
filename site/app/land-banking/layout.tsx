import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Developers Sitting on Land Instead of Building Homes?',
  description: 'The UK&apos;s top 10 housebuilders hold planning permission for over 1 million homes they have not yet started building &mdash; a phenomenon known as &ldquo;land banking&rdquo; that critics say is a structural barrier to solving the housing crisis while developers maximise profit by rationing supply.',
  openGraph: {
    title: 'Are Developers Sitting on Land Instead of Building Homes?',
    description: 'The UK&apos;s top 10 housebuilders hold planning permission for over 1 million homes they have not yet started building &mdash; a phenomenon known as &ldquo;land banking&rdquo; that critics say is a structural barrier to solving the housing crisis while developers maximise profit by rationing supply.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/land-banking',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Developers Sitting on Land Instead of Building Homes?',
    description: 'The UK&apos;s top 10 housebuilders hold planning permission for over 1 million homes they have not yet started building &mdash; a phenomenon known as &ldquo;land banking&rdquo; that critics say is a structural barrier to solving the housing crisis while developers maximise profit by rationing supply.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/land-banking',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

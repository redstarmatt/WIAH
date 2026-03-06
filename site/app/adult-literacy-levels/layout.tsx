import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many Adults Can&apos;t Read or Do Maths Properly?',
  description: '7.1 million adults in England have literacy skills at or below the level expected of a primary school child.',
  openGraph: {
    title: 'How Many Adults Can&apos;t Read or Do Maths Properly?',
    description: '7.1 million adults in England have literacy skills at or below the level expected of a primary school child.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/adult-literacy-levels',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many Adults Can&apos;t Read or Do Maths Properly?',
    description: '7.1 million adults in England have literacy skills at or below the level expected of a primary school child.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/adult-literacy-levels',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

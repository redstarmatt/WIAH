import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Over-50s Being Left Behind at Work?',
  description: 'Over 3.5 million people aged 50-64 are economically inactive, with limited returner programmes available.',
  openGraph: {
    title: 'Are Over-50s Being Left Behind at Work?',
    description: 'Over 3.5 million people aged 50-64 are economically inactive, with limited returner programmes available.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/returnerships',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Over-50s Being Left Behind at Work?',
    description: 'Over 3.5 million people aged 50-64 are economically inactive, with limited returner programmes available.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/returnerships',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

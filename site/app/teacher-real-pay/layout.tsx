import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Have Teachers Had a Real Pay Cut?',
  description: 'Teacher salaries have fallen 9% in real terms since 2010, making Britain an increasingly unattractive place to enter the profession.',
  openGraph: {
    title: 'Have Teachers Had a Real Pay Cut?',
    description: 'Teacher salaries have fallen 9% in real terms since 2010, making Britain an increasingly unattractive place to enter the profession.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/teacher-real-pay',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Have Teachers Had a Real Pay Cut?',
    description: 'Teacher salaries have fallen 9% in real terms since 2010, making Britain an increasingly unattractive place to enter the profession.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/teacher-real-pay',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

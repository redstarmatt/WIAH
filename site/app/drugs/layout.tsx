import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Is Addiction Actually Doing to Britain?',
  description: 'Drug poisoning deaths reached 4,907 in 2023—a record high. Alcohol deaths surged to 10,048. But treatment access, starved of funding for years, is finally recovering.',
  openGraph: {
    title: 'What Is Addiction Actually Doing to Britain?',
    description: 'Drug poisoning deaths reached 4,907 in 2023—a record high. Alcohol deaths surged to 10,048. But treatment access, starved of funding for years, is finally recovering.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/drugs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Addiction Actually Doing to Britain?',
    description: 'Drug poisoning deaths reached 4,907 in 2023—a record high. Alcohol deaths surged to 10,048. But treatment access, starved of funding for years, is finally recovering.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/drugs',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain Actually in the Grip of a Strike Wave?',
  description: 'The UK experienced the largest wave of industrial action since the 1970s in 2022–23, with 3.75 million working days lost — the highest since 1989 — but the strike wave has largely resolved as public sector pay deals were reached.',
  openGraph: {
    title: 'Is Britain Actually in the Grip of a Strike Wave?',
    description: 'The UK experienced the largest wave of industrial action since the 1970s in 2022–23, with 3.75 million working days lost — the highest since 1989 — but the strike wave has largely resolved as public sector pay deals were reached.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/strikes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain Actually in the Grip of a Strike Wave?',
    description: 'The UK experienced the largest wave of industrial action since the 1970s in 2022–23, with 3.75 million working days lost — the highest since 1989 — but the strike wave has largely resolved as public sector pay deals were reached.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/strikes',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

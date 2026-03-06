import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How many police officers face misconduct proceedings?',
  description: '1,738 police misconduct hearings were held in 2022/23, with 122 officers dismissed. A Black person is 4 times more likely to be stopped and searched than a white person. There are 2,057 outstanding IOPC cases, with an average resolution time of over 3 years.',
  openGraph: {
    title: 'How many police officers face misconduct proceedings?',
    description: '1,738 police misconduct hearings were held in 2022/23, with 122 officers dismissed. A Black person is 4 times more likely to be stopped and searched than a white person. There are 2,057 outstanding IOPC cases, with an average resolution time of over 3 years.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/police-misconduct',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How many police officers face misconduct proceedings?',
    description: '1,738 police misconduct hearings were held in 2022/23, with 122 officers dismissed. A Black person is 4 times more likely to be stopped and searched than a white person. There are 2,057 outstanding IOPC cases, with an average resolution time of over 3 years.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/police-misconduct',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Homes Being Made Energy Efficient?',
  description: 'Only 250,000 homes are retrofitted per year — but meeting net zero requires 2 million per year, meaning the programme must scale 8-fold.',
  openGraph: {
    title: 'Are Homes Being Made Energy Efficient?',
    description: 'Only 250,000 homes are retrofitted per year — but meeting net zero requires 2 million per year, meaning the programme must scale 8-fold.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/retrofit-insulation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Homes Being Made Energy Efficient?',
    description: 'Only 250,000 homes are retrofitted per year — but meeting net zero requires 2 million per year, meaning the programme must scale 8-fold.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/retrofit-insulation',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

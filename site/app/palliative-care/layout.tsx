import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can You Die Well in England?',
  description: 'Hospices provide care for over 200,000 people each year but receive just 27% of their funding from the NHS &mdash; the rest comes from charity shops, donations, and fundraising. Only 48% of people die in their preferred place.',
  openGraph: {
    title: 'Can You Die Well in England?',
    description: 'Hospices provide care for over 200,000 people each year but receive just 27% of their funding from the NHS &mdash; the rest comes from charity shops, donations, and fundraising. Only 48% of people die in their preferred place.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/palliative-care',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can You Die Well in England?',
    description: 'Hospices provide care for over 200,000 people each year but receive just 27% of their funding from the NHS &mdash; the rest comes from charity shops, donations, and fundraising. Only 48% of people die in their preferred place.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/palliative-care',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

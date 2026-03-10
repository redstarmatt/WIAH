import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Many People Are Using the NHS App?",
  description: "35.3 million people — 64% of England's adults — are registered on the NHS App, up from 2 million in 2020. 4.2 million GP appointments per month are now booked via the app, reducing phone call pressure on practices.",
  openGraph: {
    title: "How Many People Are Using the NHS App?",
    description: "35.3 million people — 64% of England's adults — are registered on the NHS App, up from 2 million in 2020. 4.2 million GP appointments per month are now booked via the app, reducing phone call pressure on practices.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-app-usage',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Many People Are Using the NHS App?",
    description: "35.3 million people — 64% of England's adults — are registered on the NHS App, up from 2 million in 2020. 4.2 million GP appointments per month are now booked via the app, reducing phone call pressure on practices.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-app-usage',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

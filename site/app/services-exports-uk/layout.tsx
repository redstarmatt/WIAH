import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Britain Good at Exporting Services?",
  description: "UK services exports reached a record £398 billion in 2023. The £136 billion services trade surplus partially offsets the large goods trade deficit. Financial, professional and creative services are the UK's most globally competitive sectors.",
  openGraph: {
    title: "Is Britain Good at Exporting Services?",
    description: "UK services exports reached a record £398 billion in 2023. The £136 billion services trade surplus partially offsets the large goods trade deficit. Financial, professional and creative services are the UK's most globally competitive sectors.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/services-exports-uk',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Britain Good at Exporting Services?",
    description: "UK services exports reached a record £398 billion in 2023. The £136 billion services trade surplus partially offsets the large goods trade deficit. Financial, professional and creative services are the UK's most globally competitive sectors.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/services-exports-uk',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

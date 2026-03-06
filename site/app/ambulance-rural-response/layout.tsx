import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Long Do Rural Areas Wait for an Ambulance?',
  description: 'Rural ambulance response times are on average 8 minutes longer than urban areas for Category 2 calls.',
  openGraph: {
    title: 'How Long Do Rural Areas Wait for an Ambulance?',
    description: 'Rural ambulance response times are on average 8 minutes longer than urban areas for Category 2 calls.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/ambulance-rural-response',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Long Do Rural Areas Wait for an Ambulance?',
    description: 'Rural ambulance response times are on average 8 minutes longer than urban areas for Category 2 calls.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/ambulance-rural-response',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Are We Running Out of Care Home Places?",
  description: "England has lost 15,000 care home beds since 2015 as providers close rather than operate at a loss under local authority fee rates. High occupancy masks the fragility of remaining supply.",
  openGraph: {
    title: "Are We Running Out of Care Home Places?",
    description: "England has lost 15,000 care home beds since 2015 as providers close rather than operate at a loss under local authority fee rates. High occupancy masks the fragility of remaining supply.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/care-home-supply',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Are We Running Out of Care Home Places?",
    description: "England has lost 15,000 care home beds since 2015 as providers close rather than operate at a loss under local authority fee rates. High occupancy masks the fragility of remaining supply.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/care-home-supply',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

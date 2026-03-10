import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Are School Catchment Areas the New Postcode Lottery?",
  description: "Houses within the catchment of the highest-rated schools command a £43,000 premium over nearby homes. Only 11% of pupils in top-quintile schools come from deprived backgrounds. Catchment-based admissions entrench advantage.",
  openGraph: {
    title: "Are School Catchment Areas the New Postcode Lottery?",
    description: "Houses within the catchment of the highest-rated schools command a £43,000 premium over nearby homes. Only 11% of pupils in top-quintile schools come from deprived backgrounds. Catchment-based admissions entrench advantage.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/school-catchment-inequality',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Are School Catchment Areas the New Postcode Lottery?",
    description: "Houses within the catchment of the highest-rated schools command a £43,000 premium over nearby homes. Only 11% of pupils in top-quintile schools come from deprived backgrounds. Catchment-based admissions entrench advantage.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/school-catchment-inequality',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

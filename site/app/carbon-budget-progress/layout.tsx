import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Is Britain on Track for Net Zero?`,
  description: "The UK is projected to miss its fourth carbon budget by 12% and is behind on heat pumps, building retrofits and agricultural emissions reduction. The CCC's 2024 Progress Report warned of accelerating policy gaps.",
  openGraph: {
    title: `Is Britain on Track for Net Zero?`,
    description: "The UK is projected to miss its fourth carbon budget by 12% and is behind on heat pumps, building retrofits and agricultural emissions reduction. The CCC's 2024 Progress Report warned of accelerating policy gaps.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/carbon-budget-progress',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Is Britain on Track for Net Zero?`,
    description: "The UK is projected to miss its fourth carbon budget by 12% and is behind on heat pumps, building retrofits and agricultural emissions reduction. The CCC's 2024 Progress Report warned of accelerating policy gaps.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/carbon-budget-progress',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

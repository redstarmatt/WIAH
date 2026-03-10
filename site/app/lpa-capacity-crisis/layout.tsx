import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Are Local Planning Departments Overwhelmed?",
  description: "Local planning authority staffing in England has fallen 34% since 2010 — from 16,200 to 10,700. Only 75% of major planning applications are decided on time, frustrating housebuilding and economic development.",
  openGraph: {
    title: "Are Local Planning Departments Overwhelmed?",
    description: "Local planning authority staffing in England has fallen 34% since 2010 — from 16,200 to 10,700. Only 75% of major planning applications are decided on time, frustrating housebuilding and economic development.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/lpa-capacity-crisis',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Are Local Planning Departments Overwhelmed?",
    description: "Local planning authority staffing in England has fallen 34% since 2010 — from 16,200 to 10,700. Only 75% of major planning applications are decided on time, frustrating housebuilding and economic development.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/lpa-capacity-crisis',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

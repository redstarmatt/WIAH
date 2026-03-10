import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Many People Die in Prison or Police Custody?",
  description: "312 people died in prison custody in England and Wales in 2023 — a record. Self-inflicted deaths stood at 89. Deaths following police contact reached 65. Scrutiny of restraint techniques is intensifying.",
  openGraph: {
    title: "How Many People Die in Prison or Police Custody?",
    description: "312 people died in prison custody in England and Wales in 2023 — a record. Self-inflicted deaths stood at 89. Deaths following police contact reached 65. Scrutiny of restraint techniques is intensifying.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/deaths-in-custody',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Many People Die in Prison or Police Custody?",
    description: "312 people died in prison custody in England and Wales in 2023 — a record. Self-inflicted deaths stood at 89. Deaths following police contact reached 65. Scrutiny of restraint techniques is intensifying.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/deaths-in-custody',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

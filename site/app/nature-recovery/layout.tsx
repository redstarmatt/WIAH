import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is England making progress on nature recovery?',
  description: "England's 48 Local Nature Recovery Strategies are being finalised in 2024 — a first-ever legal framework for nature. Mandatory Biodiversity Net Gain came into force in February 2024: the first law in the world requiring new developments to leave nature better off.",
  openGraph: {
    title: 'Is England making progress on nature recovery?',
    description: "England's 48 Local Nature Recovery Strategies are being finalised in 2024 — a first-ever legal framework for nature. Mandatory Biodiversity Net Gain came into force in February 2024: the first law in the world requiring new developments to leave nature better off.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nature-recovery',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is England making progress on nature recovery?',
    description: "England's 48 Local Nature Recovery Strategies are being finalised in 2024 — a first-ever legal framework for nature. Mandatory Biodiversity Net Gain came into force in February 2024: the first law in the world requiring new developments to leave nature better off.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nature-recovery',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

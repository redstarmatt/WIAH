import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Are Britain's Maternity Services Safe?",
  description: "The UK maternal mortality rate stands at 9.7 per 100,000 births — double the rate in Norway. Midwife vacancy rates reached 12.3% in 2023. The Ockenden Report found repeated safety failures in NHS maternity services. 60% of maternity units have been rated 'requires improvement' or 'inadequate' by the CQC.",
  openGraph: {
    title: "Are Britain's Maternity Services Safe?",
    description: "The UK maternal mortality rate stands at 9.7 per 100,000 births — double the rate in Norway. Midwife vacancy rates reached 12.3% in 2023. The Ockenden Report found repeated safety failures in NHS maternity services. 60% of maternity units have been rated 'requires improvement' or 'inadequate' by the CQC.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/maternity',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Are Britain's Maternity Services Safe?",
    description: "The UK maternal mortality rate stands at 9.7 per 100,000 births — double the rate in Norway. Midwife vacancy rates reached 12.3% in 2023. The Ockenden Report found repeated safety failures in NHS maternity services. 60% of maternity units have been rated 'requires improvement' or 'inadequate' by the CQC.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/maternity',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

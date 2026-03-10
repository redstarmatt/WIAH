import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Much Are Britons Losing to Scams?",
  description: "Authorised push payment fraud losses fell 12% to £459 million following the introduction of mandatory bank reimbursement. But 2.7 million adults still fall victim to scams each year — phone and online scams are dominant.",
  openGraph: {
    title: "How Much Are Britons Losing to Scams?",
    description: "Authorised push payment fraud losses fell 12% to £459 million following the introduction of mandatory bank reimbursement. But 2.7 million adults still fall victim to scams each year — phone and online scams are dominant.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/scam-losses',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Much Are Britons Losing to Scams?",
    description: "Authorised push payment fraud losses fell 12% to £459 million following the introduction of mandatory bank reimbursement. But 2.7 million adults still fall victim to scams each year — phone and online scams are dominant.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/scam-losses',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

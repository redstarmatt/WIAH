import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Are Patients and Staff Still Paying to Park at NHS Hospitals?",
  description: "92% of NHS hospital trusts charge for parking, with average daily charges of £4.20. Some trusts charge over £30 per day. A 2016 government guidance to end charges for patients with long-term conditions has been widely ignored.",
  openGraph: {
    title: "Why Are Patients and Staff Still Paying to Park at NHS Hospitals?",
    description: "92% of NHS hospital trusts charge for parking, with average daily charges of £4.20. Some trusts charge over £30 per day. A 2016 government guidance to end charges for patients with long-term conditions has been widely ignored.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/hospital-parking',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Are Patients and Staff Still Paying to Park at NHS Hospitals?",
    description: "92% of NHS hospital trusts charge for parking, with average daily charges of £4.20. Some trusts charge over £30 per day. A 2016 government guidance to end charges for patients with long-term conditions has been widely ignored.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/hospital-parking',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

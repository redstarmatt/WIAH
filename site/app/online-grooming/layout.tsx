import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Online Child Grooming Getting Worse?",
  description: "6,350 online grooming offences were recorded in England and Wales in 2023 — up 80% in five years. Cases involving children under 13 now account for 37% of the total. Under-reporting remains significant.",
  openGraph: {
    title: "Is Online Child Grooming Getting Worse?",
    description: "6,350 online grooming offences were recorded in England and Wales in 2023 — up 80% in five years. Cases involving children under 13 now account for 37% of the total. Under-reporting remains significant.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/online-grooming',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Online Child Grooming Getting Worse?",
    description: "6,350 online grooming offences were recorded in England and Wales in 2023 — up 80% in five years. Cases involving children under 13 now account for 37% of the total. Under-reporting remains significant.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/online-grooming',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

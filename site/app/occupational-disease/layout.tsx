import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Many People Get Ill Because of Their Job?",
  description: "1.8 million work-related ill health cases were recorded in 2023 — a record high. Stress, depression and anxiety account for 50% of cases. 35 million working days were lost, costing the economy an estimated £20 billion.",
  openGraph: {
    title: "How Many People Get Ill Because of Their Job?",
    description: "1.8 million work-related ill health cases were recorded in 2023 — a record high. Stress, depression and anxiety account for 50% of cases. 35 million working days were lost, costing the economy an estimated £20 billion.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/occupational-disease',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Many People Get Ill Because of Their Job?",
    description: "1.8 million work-related ill health cases were recorded in 2023 — a record high. Stress, depression and anxiety account for 50% of cases. 35 million working days were lost, costing the economy an estimated £20 billion.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/occupational-disease',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Much Is the NHS Paying for Temporary Staff?',
  description: 'The NHS spent £3.7 billion on agency and locum staff in 2023/24 — enough to employ 55,000 additional nurses at full salary.',
  openGraph: {
    title: 'How Much Is the NHS Paying for Temporary Staff?',
    description: 'The NHS spent £3.7 billion on agency and locum staff in 2023/24 — enough to employ 55,000 additional nurses at full salary.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-agency-spend',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much Is the NHS Paying for Temporary Staff?',
    description: 'The NHS spent £3.7 billion on agency and locum staff in 2023/24 — enough to employ 55,000 additional nurses at full salary.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-agency-spend',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

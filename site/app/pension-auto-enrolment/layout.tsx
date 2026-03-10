import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Has Pension Auto-Enrolment Worked?",
  description: "88% of eligible workers are now enrolled in a workplace pension — up from 55% in 2012. Auto-enrolment is one of the most successful British social policy reforms of recent decades, though minimum contribution rates remain too low for most to retire comfortably.",
  openGraph: {
    title: "Has Pension Auto-Enrolment Worked?",
    description: "88% of eligible workers are now enrolled in a workplace pension — up from 55% in 2012. Auto-enrolment is one of the most successful British social policy reforms of recent decades, though minimum contribution rates remain too low for most to retire comfortably.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/pension-auto-enrolment',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Has Pension Auto-Enrolment Worked?",
    description: "88% of eligible workers are now enrolled in a workplace pension — up from 55% in 2012. Auto-enrolment is one of the most successful British social policy reforms of recent decades, though minimum contribution rates remain too low for most to retire comfortably.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/pension-auto-enrolment',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

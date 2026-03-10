import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Same-Day Emergency Care Reducing A&E Pressure?",
  description: "Same-day emergency care attendances have grown to 3.1 million per year — diverting significant demand from emergency departments. A&E four-hour performance remains stuck at 73%, well below the 95% standard not met since 2013.",
  openGraph: {
    title: "Is Same-Day Emergency Care Reducing A&E Pressure?",
    description: "Same-day emergency care attendances have grown to 3.1 million per year — diverting significant demand from emergency departments. A&E four-hour performance remains stuck at 73%, well below the 95% standard not met since 2013.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/same-day-emergency-care',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Same-Day Emergency Care Reducing A&E Pressure?",
    description: "Same-day emergency care attendances have grown to 3.1 million per year — diverting significant demand from emergency departments. A&E four-hour performance remains stuck at 73%, well below the 95% standard not met since 2013.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/same-day-emergency-care',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

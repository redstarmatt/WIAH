import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Cancer Patients Getting Treated in Time?',
  description: '376,000 new cancer cases are diagnosed in the UK each year. Only 67% of patients begin treatment within 62 days of urgent referral &mdash; against a 85% target not met since 2015. Over 16,000 people are waiting more than 104 days for cancer treatment. UK cancer survival rates lag behind comparator countries.',
  openGraph: {
    title: 'Are Cancer Patients Getting Treated in Time?',
    description: '376,000 new cancer cases are diagnosed in the UK each year. Only 67% of patients begin treatment within 62 days of urgent referral &mdash; against a 85% target not met since 2015. Over 16,000 people are waiting more than 104 days for cancer treatment. UK cancer survival rates lag behind comparator countries.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-cancer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Cancer Patients Getting Treated in Time?',
    description: '376,000 new cancer cases are diagnosed in the UK each year. Only 67% of patients begin treatment within 62 days of urgent referral &mdash; against a 85% target not met since 2015. Over 16,000 people are waiting more than 104 days for cancer treatment. UK cancer survival rates lag behind comparator countries.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-cancer',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

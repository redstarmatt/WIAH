import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are health outcomes fair across ethnic groups?',
  description: 'Black women are 3.7 times more likely to die in childbirth than white women. Black people are 4 times more likely to be detained under the Mental Health Act. South Asian people are up to 3.8 times more likely to develop Type 2 diabetes.',
  openGraph: {
    title: 'Are health outcomes fair across ethnic groups?',
    description: 'Black women are 3.7 times more likely to die in childbirth than white women. Black people are 4 times more likely to be detained under the Mental Health Act. South Asian people are up to 3.8 times more likely to develop Type 2 diabetes.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/racial-health-gap',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are health outcomes fair across ethnic groups?',
    description: 'Black women are 3.7 times more likely to die in childbirth than white women. Black people are 4 times more likely to be detained under the Mental Health Act. South Asian people are up to 3.8 times more likely to develop Type 2 diabetes.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/racial-health-gap',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

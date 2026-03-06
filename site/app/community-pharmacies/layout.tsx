import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Community Pharmacies Disappearing?',
  description: 'England has lost over 1,100 community pharmacies since 2015 &mdash; around 10% of the total network. Remaining pharmacies are under intense financial pressure: NHS dispensing fees have not risen in real terms for years while costs have soared. Around 90% of pharmacies report being in financial difficulty. The government&apos;s Pharmacy First scheme launched in 2024, but experts warn closures will continue without adequate funding.',
  openGraph: {
    title: 'Are Community Pharmacies Disappearing?',
    description: 'England has lost over 1,100 community pharmacies since 2015 &mdash; around 10% of the total network. Remaining pharmacies are under intense financial pressure: NHS dispensing fees have not risen in real terms for years while costs have soared. Around 90% of pharmacies report being in financial difficulty. The government&apos;s Pharmacy First scheme launched in 2024, but experts warn closures will continue without adequate funding.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/community-pharmacies',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Community Pharmacies Disappearing?',
    description: 'England has lost over 1,100 community pharmacies since 2015 &mdash; around 10% of the total network. Remaining pharmacies are under intense financial pressure: NHS dispensing fees have not risen in real terms for years while costs have soared. Around 90% of pharmacies report being in financial difficulty. The government&apos;s Pharmacy First scheme launched in 2024, but experts warn closures will continue without adequate funding.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/community-pharmacies',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

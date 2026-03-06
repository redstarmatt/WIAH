import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Protest Rights Under Threat?',
  description: 'New public order powers introduced since 2022 give police sweeping authority to restrict protests — and have been used to arrest 4,278 people in 2023 alone.',
  openGraph: {
    title: 'Are Protest Rights Under Threat?',
    description: 'New public order powers introduced since 2022 give police sweeping authority to restrict protests — and have been used to arrest 4,278 people in 2023 alone.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/protest-policing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Protest Rights Under Threat?',
    description: 'New public order powers introduced since 2022 give police sweeping authority to restrict protests — and have been used to arrest 4,278 people in 2023 alone.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/protest-policing',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

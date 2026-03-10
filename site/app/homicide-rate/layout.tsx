import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Britain's Homicide Rate Rising?",
  description: "602 homicides were recorded in England and Wales in 2023, with knife killings now accounting for 40% — up from 30% in 2010. Violence is increasingly concentrated among young men in urban areas.",
  openGraph: {
    title: "Is Britain's Homicide Rate Rising?",
    description: "602 homicides were recorded in England and Wales in 2023, with knife killings now accounting for 40% — up from 30% in 2010. Violence is increasingly concentrated among young men in urban areas.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/homicide-rate',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Britain's Homicide Rate Rising?",
    description: "602 homicides were recorded in England and Wales in 2023, with knife killings now accounting for 40% — up from 30% in 2010. Violence is increasingly concentrated among young men in urban areas.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/homicide-rate',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

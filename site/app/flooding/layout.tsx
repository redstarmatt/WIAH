import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How at Risk Are British Homes from Flooding?',
  description: "6.3 million properties in England are at risk of flooding — roughly 1 in 6 homes. 2.4 million are at significant risk. Winter 2023/24 saw the most flood incidents since records began, with Storms Babet, Ciaran, and Henk causing over 2,000 property floods. The Environment Agency's flood defence budget was cut 8% in real terms between 2010 and 2023.",
  openGraph: {
    title: 'How at Risk Are British Homes from Flooding?',
    description: "6.3 million properties in England are at risk of flooding — roughly 1 in 6 homes. 2.4 million are at significant risk. Winter 2023/24 saw the most flood incidents since records began, with Storms Babet, Ciaran, and Henk causing over 2,000 property floods. The Environment Agency's flood defence budget was cut 8% in real terms between 2010 and 2023.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/flooding',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How at Risk Are British Homes from Flooding?',
    description: "6.3 million properties in England are at risk of flooding — roughly 1 in 6 homes. 2.4 million are at significant risk. Winter 2023/24 saw the most flood incidents since records began, with Storms Babet, Ciaran, and Henk causing over 2,000 property floods. The Environment Agency's flood defence budget was cut 8% in real terms between 2010 and 2023.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/flooding',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

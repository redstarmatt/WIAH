import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Is Britain Safe to Cycle In?`,
  description: "97 cyclists were killed and 4,286 seriously injured on Britain's roads in 2024. Without protected infrastructure covering major roads, cyclist safety lags far behind the Netherlands and Denmark.",
  openGraph: {
    title: `Is Britain Safe to Cycle In?`,
    description: "97 cyclists were killed and 4,286 seriously injured on Britain's roads in 2024. Without protected infrastructure covering major roads, cyclist safety lags far behind the Netherlands and Denmark.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/cycling-safety',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Is Britain Safe to Cycle In?`,
    description: "97 cyclists were killed and 4,286 seriously injured on Britain's roads in 2024. Without protected infrastructure covering major roads, cyclist safety lags far behind the Netherlands and Denmark.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/cycling-safety',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

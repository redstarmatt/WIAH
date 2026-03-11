import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `What Is Driving Britain's Population Growth?`,
  description: "The UK's population grew by 906,000 in 2023, driven almost entirely by net migration as birth rates fall. Natural change (births minus deaths) contributes less than 2% of growth.",
  openGraph: {
    title: `What Is Driving Britain's Population Growth?`,
    description: "The UK's population grew by 906,000 in 2023, driven almost entirely by net migration as birth rates fall. Natural change (births minus deaths) contributes less than 2% of growth.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/population-growth',
  },
  twitter: {
    card: 'summary_large_image',
    title: `What Is Driving Britain's Population Growth?`,
    description: "The UK's population grew by 906,000 in 2023, driven almost entirely by net migration as birth rates fall. Natural change (births minus deaths) contributes less than 2% of growth.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/population-growth',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

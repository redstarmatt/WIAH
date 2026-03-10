import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "What Has VAT on Private School Fees Done?",
  description: "The introduction of 20% VAT on private school fees in January 2025 is estimated to have prompted 35,000 pupils to move to state schools. Average fee increases of 8.9% include the VAT pass-through. Smaller independent schools are most at risk of closure.",
  openGraph: {
    title: "What Has VAT on Private School Fees Done?",
    description: "The introduction of 20% VAT on private school fees in January 2025 is estimated to have prompted 35,000 pupils to move to state schools. Average fee increases of 8.9% include the VAT pass-through. Smaller independent schools are most at risk of closure.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/private-school-vat',
  },
  twitter: {
    card: 'summary_large_image',
    title: "What Has VAT on Private School Fees Done?",
    description: "The introduction of 20% VAT on private school fees in January 2025 is estimated to have prompted 35,000 pupils to move to state schools. Average fee increases of 8.9% include the VAT pass-through. Smaller independent schools are most at risk of closure.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/private-school-vat',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

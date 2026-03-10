import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is the Military Housing Scandal Being Fixed?",
  description: "38% of service family homes still fall below the government's own decent homes standard, with 4,200 complaints filed last year. Mould, damp and heating failures are the most common issues. The Annington Homes contract constrains MoD action.",
  openGraph: {
    title: "Is the Military Housing Scandal Being Fixed?",
    description: "38% of service family homes still fall below the government's own decent homes standard, with 4,200 complaints filed last year. Mould, damp and heating failures are the most common issues. The Annington Homes contract constrains MoD action.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/military-housing-quality',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is the Military Housing Scandal Being Fixed?",
    description: "38% of service family homes still fall below the government's own decent homes standard, with 4,200 complaints filed last year. Mould, damp and heating failures are the most common issues. The Annington Homes contract constrains MoD action.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/military-housing-quality',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

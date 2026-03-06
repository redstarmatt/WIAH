import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Who Is Actually Caring for Britain's Elderly and Disabled?",
  description: '1.5 million people in England receive publicly funded social care. 532,000 care home places are available but 165,000 beds are unfilled due to staff shortages. Adult social care has a funding gap of £8 billion. 17,900 delayed discharges from hospital daily are due to lack of social care packages.',
  openGraph: {
    title: "Who Is Actually Caring for Britain's Elderly and Disabled?",
    description: '1.5 million people in England receive publicly funded social care. 532,000 care home places are available but 165,000 beds are unfilled due to staff shortages. Adult social care has a funding gap of £8 billion. 17,900 delayed discharges from hospital daily are due to lack of social care packages.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/social-care',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Who Is Actually Caring for Britain's Elderly and Disabled?",
    description: '1.5 million people in England receive publicly funded social care. 532,000 care home places are available but 165,000 beds are unfilled due to staff shortages. Adult social care has a funding gap of £8 billion. 17,900 delayed discharges from hospital daily are due to lack of social care packages.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/social-care',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

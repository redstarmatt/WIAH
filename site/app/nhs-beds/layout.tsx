import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Has the NHS Run Out of Hospital Beds?',
  description: 'England has 99,000 hospital beds — down from 300,000 in 1987 and the lowest per capita in the developed world. Bed occupancy runs at 94% — above the 85% safety threshold. The NHS needs 10,000 more beds to meet demand safely. 1 in 5 hospital beds is occupied by a patient fit for discharge but awaiting social care.',
  openGraph: {
    title: 'Has the NHS Run Out of Hospital Beds?',
    description: 'England has 99,000 hospital beds — down from 300,000 in 1987 and the lowest per capita in the developed world. Bed occupancy runs at 94% — above the 85% safety threshold. The NHS needs 10,000 more beds to meet demand safely. 1 in 5 hospital beds is occupied by a patient fit for discharge but awaiting social care.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-beds',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Has the NHS Run Out of Hospital Beds?',
    description: 'England has 99,000 hospital beds — down from 300,000 in 1987 and the lowest per capita in the developed world. Bed occupancy runs at 94% — above the 85% safety threshold. The NHS needs 10,000 more beds to meet demand safely. 1 in 5 hospital beds is occupied by a patient fit for discharge but awaiting social care.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-beds',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

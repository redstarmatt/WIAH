import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are people able to die in the place they choose?',
  description: '47% of people die in their preferred place — home or a hospice. 45.8% still die in hospital. Hospices receive just 34% of their funding from the NHS, leaving them reliant on charitable fundraising to provide a public service.',
  openGraph: {
    title: 'Are people able to die in the place they choose?',
    description: '47% of people die in their preferred place — home or a hospice. 45.8% still die in hospital. Hospices receive just 34% of their funding from the NHS, leaving them reliant on charitable fundraising to provide a public service.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/end-of-life',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are people able to die in the place they choose?',
    description: '47% of people die in their preferred place — home or a hospice. 45.8% still die in hospital. Hospices receive just 34% of their funding from the NHS, leaving them reliant on charitable fundraising to provide a public service.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/end-of-life',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Are Hospices Struggling to Stay Open?',
  description: 'Hospices provide 30&percnt; of all specialist palliative care in the UK but receive only 27&percnt; of their funding from the NHS &mdash; down from 34&percnt; in 2014 &mdash; relying instead on charity fundraising, which is increasingly squeezed by rising costs and competition for donations.',
  openGraph: {
    title: 'Why Are Hospices Struggling to Stay Open?',
    description: 'Hospices provide 30&percnt; of all specialist palliative care in the UK but receive only 27&percnt; of their funding from the NHS &mdash; down from 34&percnt; in 2014 &mdash; relying instead on charity fundraising, which is increasingly squeezed by rising costs and competition for donations.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/hospice-funding',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Are Hospices Struggling to Stay Open?',
    description: 'Hospices provide 30&percnt; of all specialist palliative care in the UK but receive only 27&percnt; of their funding from the NHS &mdash; down from 34&percnt; in 2014 &mdash; relying instead on charity fundraising, which is increasingly squeezed by rising costs and competition for donations.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/hospice-funding',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What is the State of Adult Social Care?',
  description: 'There are 410,000 people in residential and nursing care homes in England. One in four care homes has been rated &lsquo;requires improvement&rsquo; or &lsquo;inadequate&rsquo; by the CQC. Staff vacancies in social care hit 152,000 — a record — in 2022/23. Local authorities face a funding gap of over £4 billion in adult social care.',
  openGraph: {
    title: 'What is the State of Adult Social Care?',
    description: 'There are 410,000 people in residential and nursing care homes in England. One in four care homes has been rated &lsquo;requires improvement&rsquo; or &lsquo;inadequate&rsquo; by the CQC. Staff vacancies in social care hit 152,000 — a record — in 2022/23. Local authorities face a funding gap of over £4 billion in adult social care.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/care-homes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is the State of Adult Social Care?',
    description: 'There are 410,000 people in residential and nursing care homes in England. One in four care homes has been rated &lsquo;requires improvement&rsquo; or &lsquo;inadequate&rsquo; by the CQC. Staff vacancies in social care hit 152,000 — a record — in 2022/23. Local authorities face a funding gap of over £4 billion in adult social care.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/care-homes',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

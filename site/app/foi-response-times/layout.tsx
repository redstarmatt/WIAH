import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Is Government Transparency Actually Working?`,
  description: 'Only 37% of central government FOI responses met the 20-day statutory deadline in 2024. The Cabinet Office (18%) and Home Office (24%) are the worst performers. Refusal rates are rising.',
  openGraph: {
    title: `Is Government Transparency Actually Working?`,
    description: 'Only 37% of central government FOI responses met the 20-day statutory deadline in 2024. The Cabinet Office (18%) and Home Office (24%) are the worst performers. Refusal rates are rising.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/foi-response-times',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Is Government Transparency Actually Working?`,
    description: 'Only 37% of central government FOI responses met the 20-day statutory deadline in 2024. The Cabinet Office (18%) and Home Office (24%) are the worst performers. Refusal rates are rising.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/foi-response-times',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

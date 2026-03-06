import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Does the Justice System Actually Support Victims?',
  description: 'Victim satisfaction with the criminal justice system has fallen to 56.5&percnt; &mdash; down from 73&percnt; in 2015. Fewer than half of victims say they were kept adequately informed about their case. The Victims&apos; Code, which sets out entitlements, is routinely breached with no meaningful enforcement mechanism.',
  openGraph: {
    title: 'Does the Justice System Actually Support Victims?',
    description: 'Victim satisfaction with the criminal justice system has fallen to 56.5&percnt; &mdash; down from 73&percnt; in 2015. Fewer than half of victims say they were kept adequately informed about their case. The Victims&apos; Code, which sets out entitlements, is routinely breached with no meaningful enforcement mechanism.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/victims-support',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Does the Justice System Actually Support Victims?',
    description: 'Victim satisfaction with the criminal justice system has fallen to 56.5&percnt; &mdash; down from 73&percnt; in 2015. Fewer than half of victims say they were kept adequately informed about their case. The Victims&apos; Code, which sets out entitlements, is routinely breached with no meaningful enforcement mechanism.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/victims-support',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

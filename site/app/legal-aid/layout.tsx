import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Justice Still Available to Those Who Can't Afford a Lawyer?",
  description: 'Legal aid spending fell 36&percnt; in real terms between 2010 and 2024. The number of solicitor firms holding legal aid contracts halved from 2,300 to around 1,150 — creating legal aid deserts where 1 in 4 English local authority areas has no solicitor offering legally aided services within a reasonable distance. Those without money increasingly face the courts alone.',
  openGraph: {
    title: "Is Justice Still Available to Those Who Can't Afford a Lawyer?",
    description: 'Legal aid spending fell 36&percnt; in real terms between 2010 and 2024. The number of solicitor firms holding legal aid contracts halved from 2,300 to around 1,150 — creating legal aid deserts where 1 in 4 English local authority areas has no solicitor offering legally aided services within a reasonable distance. Those without money increasingly face the courts alone.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/legal-aid',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Justice Still Available to Those Who Can't Afford a Lawyer?",
    description: 'Legal aid spending fell 36&percnt; in real terms between 2010 and 2024. The number of solicitor firms holding legal aid contracts halved from 2,300 to around 1,150 — creating legal aid deserts where 1 in 4 English local authority areas has no solicitor offering legally aided services within a reasonable distance. Those without money increasingly face the courts alone.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/legal-aid',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

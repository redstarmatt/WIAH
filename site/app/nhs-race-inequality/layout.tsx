import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Does the NHS Treat Everyone Equally?',
  description: 'Black women in the UK are 3.4 times more likely to die in pregnancy or childbirth than white women. Ethnic minority staff make up 24.8&percnt; of the NHS workforce but just 10.5&percnt; of senior leaders. Despite a decade of the Workforce Race Equality Standard, the gap between staff experience and representation at senior level has barely narrowed.',
  openGraph: {
    title: 'Does the NHS Treat Everyone Equally?',
    description: 'Black women in the UK are 3.4 times more likely to die in pregnancy or childbirth than white women. Ethnic minority staff make up 24.8&percnt; of the NHS workforce but just 10.5&percnt; of senior leaders. Despite a decade of the Workforce Race Equality Standard, the gap between staff experience and representation at senior level has barely narrowed.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-race-inequality',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Does the NHS Treat Everyone Equally?',
    description: 'Black women in the UK are 3.4 times more likely to die in pregnancy or childbirth than white women. Ethnic minority staff make up 24.8&percnt; of the NHS workforce but just 10.5&percnt; of senior leaders. Despite a decade of the Workforce Race Equality Standard, the gap between staff experience and representation at senior level has barely narrowed.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-race-inequality',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

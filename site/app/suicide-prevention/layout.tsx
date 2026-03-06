import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Is Britain Failing to Prevent Suicide?',
  description: 'Around 5,642 deaths by suicide were registered in England and Wales in 2022 — the highest since 1999. Men account for 75% of all suicides. Suicide is the leading cause of death for people aged 20–34. The UK suicide rate stands at 10.7 per 100,000 — above the EU average. Crisis services are overwhelmed: A&amp;E presentations for self-harm have doubled since 2010.',
  openGraph: {
    title: 'Why Is Britain Failing to Prevent Suicide?',
    description: 'Around 5,642 deaths by suicide were registered in England and Wales in 2022 — the highest since 1999. Men account for 75% of all suicides. Suicide is the leading cause of death for people aged 20–34. The UK suicide rate stands at 10.7 per 100,000 — above the EU average. Crisis services are overwhelmed: A&amp;E presentations for self-harm have doubled since 2010.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/suicide-prevention',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Is Britain Failing to Prevent Suicide?',
    description: 'Around 5,642 deaths by suicide were registered in England and Wales in 2022 — the highest since 1999. Men account for 75% of all suicides. Suicide is the leading cause of death for people aged 20–34. The UK suicide rate stands at 10.7 per 100,000 — above the EU average. Crisis services are overwhelmed: A&amp;E presentations for self-harm have doubled since 2010.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/suicide-prevention',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

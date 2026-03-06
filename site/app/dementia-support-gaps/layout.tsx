import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are People with Dementia Getting the Care They Need?',
  description: 'Just 64% of people with dementia receive a formal diagnosis — and 40% get no structured post-diagnostic support, despite the Prime Minister&rsquo;s Dementia Challenge.',
  openGraph: {
    title: 'Are People with Dementia Getting the Care They Need?',
    description: 'Just 64% of people with dementia receive a formal diagnosis — and 40% get no structured post-diagnostic support, despite the Prime Minister&rsquo;s Dementia Challenge.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/dementia-support-gaps',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are People with Dementia Getting the Care They Need?',
    description: 'Just 64% of people with dementia receive a formal diagnosis — and 40% get no structured post-diagnostic support, despite the Prime Minister&rsquo;s Dementia Challenge.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/dementia-support-gaps',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

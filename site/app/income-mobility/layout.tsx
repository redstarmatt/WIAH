import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Can You Escape the Income You're Born Into?`,
  description: '38% of UK children born in the poorest fifth remain there as adults — well above the 20% equal-mobility benchmark. The UK's mobility deficit is worse than France, Germany and all Nordic countries.',
  openGraph: {
    title: `Can You Escape the Income You're Born Into?`,
    description: '38% of UK children born in the poorest fifth remain there as adults — well above the 20% equal-mobility benchmark. The UK's mobility deficit is worse than France, Germany and all Nordic countries.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/income-mobility',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Can You Escape the Income You're Born Into?`,
    description: '38% of UK children born in the poorest fifth remain there as adults — well above the 20% equal-mobility benchmark. The UK's mobility deficit is worse than France, Germany and all Nordic countries.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/income-mobility',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

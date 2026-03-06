import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Are Britain's Carbon Stores Being Protected?",
  description: "UK peatlands store 3.2 billion tonnes of carbon — more than all forests in the UK, France, and Germany combined. But 80&percnt; are degraded and currently emit 23 million tonnes of CO&#8322; per year, making damaged peat one of Britain's largest single sources of greenhouse gas emissions.",
  openGraph: {
    title: "Are Britain's Carbon Stores Being Protected?",
    description: "UK peatlands store 3.2 billion tonnes of carbon — more than all forests in the UK, France, and Germany combined. But 80&percnt; are degraded and currently emit 23 million tonnes of CO&#8322; per year, making damaged peat one of Britain's largest single sources of greenhouse gas emissions.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/peatlands',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Are Britain's Carbon Stores Being Protected?",
    description: "UK peatlands store 3.2 billion tonnes of carbon — more than all forests in the UK, France, and Germany combined. But 80&percnt; are degraded and currently emit 23 million tonnes of CO&#8322; per year, making damaged peat one of Britain's largest single sources of greenhouse gas emissions.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/peatlands',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

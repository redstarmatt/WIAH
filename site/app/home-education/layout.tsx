import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Many Children Are Being Educated at Home?",
  description: "92,000 children in England are registered for elective home education — a record, up 75% since 2019. School anxiety is the main driver. Most local authorities have no register, creating a safeguarding blind spot.",
  openGraph: {
    title: "How Many Children Are Being Educated at Home?",
    description: "92,000 children in England are registered for elective home education — a record, up 75% since 2019. School anxiety is the main driver. Most local authorities have no register, creating a safeguarding blind spot.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/home-education',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Many Children Are Being Educated at Home?",
    description: "92,000 children in England are registered for elective home education — a record, up 75% since 2019. School anxiety is the main driver. Most local authorities have no register, creating a safeguarding blind spot.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/home-education',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Safe Are People Online in Britain?',
  description: 'Online fraud accounts for 41% of all crime in England and Wales — 3.8 million incidents per year. Reports of child sexual abuse material online reached 1.2 million in 2023. Cybercrime costs the UK economy £27 billion per year. The Online Safety Act 2023 represents the most significant attempt to regulate internet platforms in British history.',
  openGraph: {
    title: 'How Safe Are People Online in Britain?',
    description: 'Online fraud accounts for 41% of all crime in England and Wales — 3.8 million incidents per year. Reports of child sexual abuse material online reached 1.2 million in 2023. Cybercrime costs the UK economy £27 billion per year. The Online Safety Act 2023 represents the most significant attempt to regulate internet platforms in British history.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/online-harms',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Safe Are People Online in Britain?',
    description: 'Online fraud accounts for 41% of all crime in England and Wales — 3.8 million incidents per year. Reports of child sexual abuse material online reached 1.2 million in 2023. Cybercrime costs the UK economy £27 billion per year. The Online Safety Act 2023 represents the most significant attempt to regulate internet platforms in British history.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/online-harms',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

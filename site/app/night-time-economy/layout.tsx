import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "What Is Happening to Britain's Night-Time Economy?",
  description: "The UK night-time economy generates £66 billion — recovering post-COVID but still below the pre-pandemic £93 billion peak. 1,200 late-night venues close each year on a net basis. The number of nightclubs has halved since 2005.",
  openGraph: {
    title: "What Is Happening to Britain's Night-Time Economy?",
    description: "The UK night-time economy generates £66 billion — recovering post-COVID but still below the pre-pandemic £93 billion peak. 1,200 late-night venues close each year on a net basis. The number of nightclubs has halved since 2005.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/night-time-economy',
  },
  twitter: {
    card: 'summary_large_image',
    title: "What Is Happening to Britain's Night-Time Economy?",
    description: "The UK night-time economy generates £66 billion — recovering post-COVID but still below the pre-pandemic £93 billion peak. 1,200 late-night venues close each year on a net basis. The number of nightclubs has halved since 2005.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/night-time-economy',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

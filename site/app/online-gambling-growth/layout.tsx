import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Online Gambling Getting Bigger?",
  description: "Online gambling generated £7 billion in gross yield in 2023 — nearly half the total UK gambling market. 1.3 million people play online slots at high intensity, and an estimated 430,000 are problem gamblers.",
  openGraph: {
    title: "Is Online Gambling Getting Bigger?",
    description: "Online gambling generated £7 billion in gross yield in 2023 — nearly half the total UK gambling market. 1.3 million people play online slots at high intensity, and an estimated 430,000 are problem gamblers.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/online-gambling-growth',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Online Gambling Getting Bigger?",
    description: "Online gambling generated £7 billion in gross yield in 2023 — nearly half the total UK gambling market. 1.3 million people play online slots at high intensity, and an estimated 430,000 are problem gamblers.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/online-gambling-growth',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

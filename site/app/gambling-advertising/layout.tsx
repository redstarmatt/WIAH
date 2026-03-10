import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Gambling Advertising Out of Control?",
  description: "The average person sees 4.7 gambling adverts per week — double the 2014 rate. 61% of problem gamblers say they receive personalised gambling advertising, exploiting their vulnerability.",
  openGraph: {
    title: "Is Gambling Advertising Out of Control?",
    description: "The average person sees 4.7 gambling adverts per week — double the 2014 rate. 61% of problem gamblers say they receive personalised gambling advertising, exploiting their vulnerability.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/gambling-advertising',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Gambling Advertising Out of Control?",
    description: "The average person sees 4.7 gambling adverts per week — double the 2014 rate. 61% of problem gamblers say they receive personalised gambling advertising, exploiting their vulnerability.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/gambling-advertising',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

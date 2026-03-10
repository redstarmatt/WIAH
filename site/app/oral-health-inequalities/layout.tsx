import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Oral Health Still Determined by Your Postcode?",
  description: "Children in the most deprived areas are three times as likely to have tooth decay as those in the most affluent. 42% of adults were unable to access an NHS dentist when they needed one — up from 26% in 2019.",
  openGraph: {
    title: "Is Oral Health Still Determined by Your Postcode?",
    description: "Children in the most deprived areas are three times as likely to have tooth decay as those in the most affluent. 42% of adults were unable to access an NHS dentist when they needed one — up from 26% in 2019.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/oral-health-inequalities',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Oral Health Still Determined by Your Postcode?",
    description: "Children in the most deprived areas are three times as likely to have tooth decay as those in the most affluent. 42% of adults were unable to access an NHS dentist when they needed one — up from 26% in 2019.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/oral-health-inequalities',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

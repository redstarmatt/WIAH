import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Britain's Wellbeing Improving?",
  description: "Average UK life satisfaction fell to 7.4/10 in 2024-25 \u2014 below pre-pandemic levels. High anxiety now affects 24% of adults; young people and those in deprived areas are worst affected.",
  openGraph: {
    title: "Is Britain's Wellbeing Improving?",
    description: "Average UK life satisfaction fell to 7.4/10 in 2024-25 \u2014 below pre-pandemic levels. High anxiety now affects 24% of adults; young people and those in deprived areas are worst affected.",
    type: 'article',
    url: "https://whatisactuallyhappening.uk/personal-wellbeing",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Britain's Wellbeing Improving?",
    description: "Average UK life satisfaction fell to 7.4/10 in 2024-25 \u2014 below pre-pandemic levels. High anxiety now affects 24% of adults; young people and those in deprived areas are worst affected.",
  },
  alternates: {
    canonical: "https://whatisactuallyhappening.uk/personal-wellbeing",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>({children})</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Does the Student Loan System Work?",
  description: "The average English graduate leaves with £45,800 of debt, paying 6.25% interest. The government expects to write off 43% of the total loan value — meaning the system is neither a true loan nor a transparent graduate tax.",
  openGraph: {
    title: "Does the Student Loan System Work?",
    description: "The average English graduate leaves with £45,800 of debt, paying 6.25% interest. The government expects to write off 43% of the total loan value — meaning the system is neither a true loan nor a transparent graduate tax.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/student-loan-economics',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Does the Student Loan System Work?",
    description: "The average English graduate leaves with £45,800 of debt, paying 6.25% interest. The government expects to write off 43% of the total loan value — meaning the system is neither a true loan nor a transparent graduate tax.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/student-loan-economics',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

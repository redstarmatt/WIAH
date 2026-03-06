import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Long Do Patients Wait for ADHD Assessment?',
  description: 'NHS England reports rising ADHD referrals with waiting lists exceeding two years in many areas, leaving thousands without diagnosis or support.',
  openGraph: {
    title: 'How Long Do Patients Wait for ADHD Assessment?',
    description: 'NHS England reports rising ADHD referrals with waiting lists exceeding two years in many areas, leaving thousands without diagnosis or support.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/adhd-waiting-times',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Long Do Patients Wait for ADHD Assessment?',
    description: 'NHS England reports rising ADHD referrals with waiting lists exceeding two years in many areas, leaving thousands without diagnosis or support.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/adhd-waiting-times',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

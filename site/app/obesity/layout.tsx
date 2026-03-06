import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Is Britain's Obesity Crisis Changing the Nation's Health?",
  description: '28% of adults in England are obese — double the 1990s rate. A further 38% are overweight. Obesity costs the NHS £6.1 billion per year. The UK has the highest obesity rate in Western Europe. New GLP-1 weight-loss drugs (Wegovy, Mounjaro) could transform treatment, but NHS access is severely rationed.',
  openGraph: {
    title: "How Is Britain's Obesity Crisis Changing the Nation's Health?",
    description: '28% of adults in England are obese — double the 1990s rate. A further 38% are overweight. Obesity costs the NHS £6.1 billion per year. The UK has the highest obesity rate in Western Europe. New GLP-1 weight-loss drugs (Wegovy, Mounjaro) could transform treatment, but NHS access is severely rationed.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/obesity',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Is Britain's Obesity Crisis Changing the Nation's Health?",
    description: '28% of adults in England are obese — double the 1990s rate. A further 38% are overweight. Obesity costs the NHS £6.1 billion per year. The UK has the highest obesity rate in Western Europe. New GLP-1 weight-loss drugs (Wegovy, Mounjaro) could transform treatment, but NHS access is severely rationed.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/obesity',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

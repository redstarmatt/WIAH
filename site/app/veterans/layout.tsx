import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are British Veterans Actually Being Looked After?',
  description: 'There are an estimated 2.4 million veterans in the UK. Around 1 in 5 combat veterans experiences PTSD. Op COURAGE, the NHS mental health service for veterans, received 21,000 referrals in its first three years. But rough sleeping rates among veterans remain stubbornly high and armed forces recruitment falls short of targets.',
  openGraph: {
    title: 'Are British Veterans Actually Being Looked After?',
    description: 'There are an estimated 2.4 million veterans in the UK. Around 1 in 5 combat veterans experiences PTSD. Op COURAGE, the NHS mental health service for veterans, received 21,000 referrals in its first three years. But rough sleeping rates among veterans remain stubbornly high and armed forces recruitment falls short of targets.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/veterans',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are British Veterans Actually Being Looked After?',
    description: 'There are an estimated 2.4 million veterans in the UK. Around 1 in 5 combat veterans experiences PTSD. Op COURAGE, the NHS mental health service for veterans, received 21,000 referrals in its first three years. But rough sleeping rates among veterans remain stubbornly high and armed forces recruitment falls short of targets.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/veterans',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

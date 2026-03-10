import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Ultra-Processed Food Taking Over the British Diet?",
  description: "57% of the UK diet now comes from ultra-processed foods — the highest share in Europe. Children's diets are even more dominated at 65%. Research links UPF consumption to obesity, ADHD, anxiety and reduced life expectancy.",
  openGraph: {
    title: "Is Ultra-Processed Food Taking Over the British Diet?",
    description: "57% of the UK diet now comes from ultra-processed foods — the highest share in Europe. Children's diets are even more dominated at 65%. Research links UPF consumption to obesity, ADHD, anxiety and reduced life expectancy.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/ultra-processed-food',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Ultra-Processed Food Taking Over the British Diet?",
    description: "57% of the UK diet now comes from ultra-processed foods — the highest share in Europe. Children's diets are even more dominated at 65%. Research links UPF consumption to obesity, ADHD, anxiety and reduced life expectancy.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/ultra-processed-food',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

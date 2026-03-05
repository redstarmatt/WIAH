import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preventable Deaths',
  description: 'Avoidable mortality has fallen 27% since 2010 to 218 per 100,000 one of the NHS s quiet success stories. But the gap between London (166) and the North East (27',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

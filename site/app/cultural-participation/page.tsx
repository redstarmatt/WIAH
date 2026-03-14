'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Arts Council England', dataset: 'Taking Part survey — cultural engagement', url: 'https://www.gov.uk/government/collections/taking-part', date: '2024' },
  { num: 2, name: 'DCMS', dataset: 'Participation Survey', url: 'https://www.gov.uk/government/collections/participation-survey', date: '2024' },
  { num: 3, name: 'Arts Council England', dataset: 'Equality, Diversity and Inclusion data', url: 'https://www.artscouncil.org.uk/research-and-data/diversity-data', date: '2024' },
];

interface DataPoint {
  year: number;
  museumVisits: number;
  theaterAttendance: number;
  libraryUsage: number;
  digitalArtsEngagement: number;
}

interface TopicData {
  national: { timeSeries: DataPoint[] };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

export default function CulturalParticipationPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/cultural-participation/cultural_participation.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'museumVisits', label: 'Museum/gallery visits (millions)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.museumVisits })) },
        { id: 'theaterAttendance', label: 'Theatre attendance (millions)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.theaterAttendance })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'libraryUsage', label: 'Library usage (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.libraryUsage })) },
        { id: 'digitalArtsEngagement', label: 'Digital arts engagement (%)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.digitalArtsEngagement })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid — venues closed' },
    { date: new Date(2022, 5, 1), label: 'Post-Covid recovery uneven' },
  ];

  return (
    <>
      <TopicNav topic="Society" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Society"
          question="Is Cultural Participation Declining in Britain?"
          finding={<>Physical cultural participation — visits to museums, theatres, and galleries — has largely recovered from the pandemic but remains below 2019 levels, with attendance still 10–15% down on pre-Covid figures.<Cite nums={1} /> The socio-economic and ethnic participation gap in the arts has not narrowed.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Cultural participation — engagement with the arts, heritage, museums, and live performance — is valued both for its economic contribution (arts and culture contribute over £10 billion annually to the UK economy) and for its social benefits, which include wellbeing, social cohesion, and educational outcomes. The Taking Part survey, which tracks participation annually, shows that participation broadly held up in the 2010s despite public funding cuts, partly because digital access expanded. The pandemic then caused a near-complete cessation of in-person activity.<Cite nums={1} /></p>
            <p>Recovery has been uneven. Major national institutions — the British Museum, National Gallery, West End theatres — have returned broadly to pre-pandemic visitor levels. But regional venues, smaller companies, and grassroots arts organisations — which disproportionately serve less affluent and more diverse communities — have faced a harder path back, partly because of venue closures, partly because of audience habit changes. The participation gap by socio-economic background and ethnicity has not closed: Arts Council England&apos;s own data shows that cultural audiences remain disproportionately white, older, and highly educated.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Venue visits' },
          { id: 'sec-chart2', label: 'Engagement rates' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Museum/gallery visits" value="48m" unit="" direction="up" polarity="up-is-good" changeText={<>Recovering; was 55m pre-Covid<Cite nums={1} /></>} sparklineData={[55, 54, 53, 10, 25, 38, 44, 46, 47, 48, 48]} href="#sec-chart1" />
          <MetricCard label="Adults engaged in arts (%)" value="72" unit="%" direction="flat" polarity="up-is-good" changeText={<>Includes digital; was 74% pre-Covid<Cite nums={2} /></>} sparklineData={[74, 75, 74, 55, 65, 68, 70, 71, 72, 72, 72]} href="#sec-chart2" />
          <MetricCard label="Socioeconomic gap (ABC1 vs DE)" value="18" unit="pp" direction="flat" polarity="up-is-bad" changeText={<>Persistent gap; little change since 2010<Cite nums={3} /></>} sparklineData={[17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Museum and theatre visits, 2015–2024" subtitle="Annual museum/gallery visits and theatre attendances (millions), England" series={chart1Series} annotations={annotations} yLabel="Millions" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Cultural engagement rates, 2015–2024" subtitle="Adults engaging with libraries (%) and digital arts (%) in past year, England" series={chart2Series} annotations={[]} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Free museum admission" value="44m" unit="free visits" description={<>Free admission to national museums and galleries — introduced in 2001 — generates around 44 million visits annually, with evidence that it has significantly broadened the socio-economic range of museum visitors compared to the charging era.<Cite nums={1} /></>} source="Source: Arts Council England, free museums impact." />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">{src.name} — {src.dataset}</a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((issue, i) => <li key={i}>{issue}</li>)}
            </ul>
          </div>
        </section>
        <References items={editorialRefs} />
      </main>
    </>
  );
}

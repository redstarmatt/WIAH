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
  { num: 1, name: 'ONS', dataset: 'Loneliness — what characteristics and circumstances are associated with feeling lonely?', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/wellbeing/articles/lonelinesswhatarenthecharacteristicsandcircumstancesassociatedwithfeelinglonely/2018-04-10', date: '2024' },
  { num: 2, name: 'Campaign to End Loneliness', dataset: 'The state of loneliness', url: 'https://www.campaigntoendloneliness.org/the-facts-on-loneliness/', date: '2024' },
  { num: 3, name: 'Age UK', dataset: 'Loneliness Evidence Review', url: 'https://www.ageuk.org.uk/our-impact/policy-research/loneliness-research-and-resources/', date: '2024' },
];

interface DataPoint {
  year: number;
  chronicLonelinessOver65: number;
  socialContactDays: number;
  lonelinessHealthImpact: number;
  socialPrescribingReferrals: number;
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

export default function LonelinessOlderAdultsPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/loneliness-older-adults/loneliness_older_adults.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'chronicLonelinessOver65', label: 'Chronically lonely (65+, %)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.chronicLonelinessOver65 })) },
        { id: 'socialContactDays', label: 'Days with meaningful contact/week', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.socialContactDays })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'socialPrescribingReferrals', label: 'Social prescribing referrals (thousands)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.socialPrescribingReferrals })) },
        { id: 'lonelinessHealthImpact', label: 'GP visits attributed to loneliness (%)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.lonelinessHealthImpact })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: 'Minister for Loneliness appointed' },
    { date: new Date(2020, 5, 1), label: 'Covid — isolation deepened for elderly' },
  ];

  return (
    <>
      <TopicNav topic="Health & Society" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health & Society"
          question="How Lonely Are Older People in Britain?"
          finding={<>Around 1.4 million older people in England are chronically lonely — spending extended periods with no meaningful social contact.<Cite nums={1} /> The health consequences are equivalent to smoking 15 cigarettes a day, yet social prescribing — the main policy response — remains patchy and under-resourced.<Cite nums={[2, 3]} /></>}
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK was the first country in the world to appoint a Minister for Loneliness, in January 2018, following the Jo Cox Commission on Loneliness report the previous year. This reflected a growing recognition that loneliness — particularly chronic loneliness in older adults — is a serious public health problem. Age UK estimates that 1.4 million older people are chronically lonely, and that 3.9 million say the television is their main source of company. The pandemic sharply worsened isolation for the most vulnerable older people.<Cite nums={1} /></p>
            <p>The health consequences of loneliness are well-documented: increased risk of cardiovascular disease, dementia, depression, and earlier mortality. A Lancet meta-analysis put the mortality risk of loneliness on a par with smoking. The NHS&apos;s response has centred on social prescribing — Link Workers in GP practices who can connect people with community activities and support — but the system is still being built out, referrals are inconsistent, and the voluntary sector capacity that social prescribing relies on has faced its own funding pressures.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Loneliness measures' },
          { id: 'sec-chart2', label: 'Response' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Chronically lonely (65+)" value="1.4m" unit="" direction="up" polarity="up-is-bad" changeText={<>Up from 1.1m pre-pandemic<Cite nums={1} /></>} sparklineData={[1.1, 1.15, 1.2, 1.25, 1.4, 1.5, 1.45, 1.42, 1.40, 1.40, 1.40]} href="#sec-chart1" />
          <MetricCard label="TV as main company" value="3.9m" unit="" direction="flat" polarity="up-is-bad" changeText={<>Isolated older people, England<Cite nums={3} /></>} sparklineData={[3.5, 3.6, 3.7, 3.8, 4.1, 4.2, 4.0, 3.95, 3.9, 3.9, 3.9]} href="#sec-chart1" />
          <MetricCard label="Social prescribing referrals" value="900k" unit="" direction="up" polarity="up-is-good" changeText={<>Rapidly expanding NHS programme<Cite nums={2} /></>} sparklineData={[50, 100, 200, 300, 400, 550, 650, 750, 800, 850, 900]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Chronic loneliness in older adults, 2015–2024" subtitle="Chronically lonely people aged 65+ (millions) and days per week with meaningful social contact" series={chart1Series} annotations={annotations} yLabel="Millions / days" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Social prescribing referrals and GP loneliness consultations, 2015–2024" subtitle="Social prescribing referrals (thousands) and estimated % of GP visits involving loneliness" series={chart2Series} annotations={[]} yLabel="Thousands / %" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Befriending services" value="350k" unit="volunteers" description={<>Around 350,000 volunteers provide regular befriending — phone calls, visits, and companionship — to isolated older people through charities such as Age UK, Royal Voluntary Service, and local schemes.<Cite nums={3} /></>} source="Source: Age UK, befriending services impact report." />
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

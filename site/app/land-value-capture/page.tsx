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
  { num: 1, name: 'MHCLG', dataset: 'Land Value Uplift and Planning Obligations Data', url: 'https://www.gov.uk/government/collections/planning-obligations', date: '2024' },
  { num: 2, name: 'CPRE', dataset: 'Land Value: Who Benefits from Planning Decisions?', url: 'https://www.cpre.org.uk/resources/land-value/', date: '2023' },
  { num: 3, name: 'ONS', dataset: 'UK Estimates of the Value of Land', url: 'https://www.ons.gov.uk/economy/nationalaccounts/uksectoraccounts/compendium/economicreview/october2019/uklandestimatesarticle', date: '2023' },
];

interface DataPoint {
  year: number;
  s106Contributions: number;
  cifLevy: number;
  landValueUplift: number;
  affordableHomesViaCVC: number;
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

export default function LandValueCapturePage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/land-value-capture/land_value_capture.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 's106Contributions', label: 'Section 106 contributions (£bn/yr)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.s106Contributions })) },
        { id: 'cifLevy', label: 'Community Infrastructure Levy (£bn/yr)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.cifLevy })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'landValueUplift', label: 'Estimated land value uplift from planning (£bn/yr)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.landValueUplift })) },
        { id: 'affordableHomesViaCVC', label: 'Affordable homes delivered via developer contributions', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.affordableHomesViaCVC })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: 'CIL review and reform proposals' },
    { date: new Date(2023, 5, 1), label: 'Infrastructure Levy proposed (Levelling Up Act)' },
  ];

  return (
    <>
      <TopicNav topic="Housing & Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing & Economy"
          question="Is the UK Capturing Land Value for Public Benefit?"
          finding={<>When land is granted planning permission in England, its value typically increases by 100 to 200 times — but the public only captures a fraction of this windfall through developer contributions. In 2022–23, around £7bn was captured via Section 106 and Community Infrastructure Levy, compared to an estimated £50bn in annual land value uplift from planning decisions.<Cite nums={1} /> Reforming this system is considered key to funding affordable housing and infrastructure.<Cite nums={[2, 3]} /></>}
          colour="#F4A261"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The enormous gap between the value of agricultural land and the value of land with planning permission for housing — a ratio of roughly 100:1 — represents one of the most significant economic distortions in the UK economy.<Cite nums={2} /> When a local authority grants planning consent, land that was worth £20,000 per hectare as a field can become worth £2–3m per hectare as a housing site. This windfall accrues almost entirely to landowners and developers, not to the public who granted the permission or the infrastructure that enabled the development. The ONS estimates the total value of all UK land at over £6 trillion, with residential land accounting for the largest share.</p>
            <p>The principal mechanisms for capturing a share of land value uplift are Section 106 agreements (negotiated developer obligations for affordable housing and infrastructure) and the Community Infrastructure Levy (a standard charge on development). Together they raised around £7bn in 2022–23 — significant but a small fraction of the estimated total uplift.<Cite nums={1} /> The Levelling Up and Regeneration Act 2023 proposed replacing CIL and some Section 106 obligations with a new Infrastructure Levy, but implementation has been delayed and critics argue the proposed reforms would not significantly increase capture rates. CPRE and housing researchers consistently argue that stronger compulsory purchase powers at agricultural values would transform public ability to capture uplift for affordable housing and infrastructure.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-contributions', label: 'Developer contributions' },
          { id: 'sec-uplift', label: 'Land value uplift' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Section 106 and CIL receipts" value="7" unit="£bn/yr" direction="up" polarity="up-is-good" changeText={<>Up from £5bn in 2015<Cite nums={1} /></>} sparklineData={[5.0, 5.2, 5.5, 5.8, 6.0, 5.5, 6.0, 6.4, 6.7, 6.9, 7.0]} href="#sec-contributions" />
          <MetricCard label="Estimated planning uplift (annual)" value="~50" unit="£bn" direction="up" polarity="up-is-bad" changeText={<>Public captures ~14% of this via developer contributions<Cite nums={2} /></>} sparklineData={[30, 33, 36, 40, 44, 38, 42, 46, 48, 50, 50]} href="#sec-uplift" />
          <MetricCard label="Affordable homes via developer contributions" value="28" unit="thousand/yr" direction="flat" polarity="up-is-good" changeText={<>~26% of all new affordable homes<Cite nums={1} /></>} sparklineData={[25, 26, 27, 28, 28, 24, 26, 27, 28, 28, 28]} href="#sec-contributions" />
        </div>

        <ScrollReveal>
          <section id="sec-contributions" className="mb-12">
            <LineChart title="Developer contributions to public benefit, 2015–2024" subtitle="Section 106 contributions and Community Infrastructure Levy receipts (£bn/yr), England." series={chart1Series} annotations={annotations} yLabel="£bn" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-uplift" className="mb-12">
            <LineChart title="Land value uplift and affordable homes delivered, 2015–2024" subtitle="Estimated annual planning uplift (£bn) and affordable homes via developer contributions (thousands), England." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Highest and best use" value="100x" unit="typical uplift ratio" description={<>Research consistently finds that planning permission for residential development increases land values by around 100–200 times — among the highest uplift ratios anywhere in the world — reflecting both the chronic undersupply of development land and restrictive planning policy.<Cite nums={2} /></>} source="Source: CPRE, The Value of Land, 2023." />
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

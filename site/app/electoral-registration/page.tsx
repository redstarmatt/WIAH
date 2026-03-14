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
  { num: 1, name: 'Electoral Commission', dataset: 'UK Electoral Registration Statistics', url: 'https://www.electoralcommission.org.uk/who-we-are-and-what-we-do/elections-and-referendums/electoral-registration', date: '2024' },
  { num: 2, name: 'Electoral Commission', dataset: 'Accuracy and Completeness of UK Electoral Registers', url: 'https://www.electoralcommission.org.uk/who-we-are-and-what-we-do/elections-and-referendums/electoral-registration/accuracy-and-completeness-electoral-registers', date: '2023' },
  { num: 3, name: 'Bite the Ballot', dataset: 'Voter Registration Gap Analysis', url: 'https://www.bitetheballot.co.uk/', date: '2024' },
];

interface DataPoint {
  year: number;
  registrationRate: number;
  unregisteredEstimate: number;
  youngPeopleRate: number;
  rentersRate: number;
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

export default function ElectoralRegistrationPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/electoral-registration/electoral_registration.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'registrationRate', label: 'Electoral registration rate, all eligible adults (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.registrationRate })) },
        { id: 'youngPeopleRate', label: 'Registration rate, 18–24s (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.youngPeopleRate })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'unregisteredEstimate', label: 'Estimated unregistered eligible voters (millions)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.unregisteredEstimate })) },
        { id: 'rentersRate', label: 'Registration rate, private renters (%)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.rentersRate })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2014, 5, 1), label: 'Individual Electoral Registration introduced' },
    { date: new Date(2024, 5, 1), label: 'Photo ID required to vote (England)' },
  ];

  return (
    <>
      <TopicNav topic="Society" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Society"
          question="How Many Eligible Voters Are Not Registered?"
          finding={<>An estimated 8 million eligible voters — about 15% of the eligible population — are not registered to vote in the UK, with the gap particularly pronounced among young people, private renters, and those from ethnic minority backgrounds.<Cite nums={1} /> The introduction of Individual Electoral Registration in 2014 removed approximately 1 million people from the rolls overnight.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Electoral Commission's accuracy and completeness surveys estimate that around 8 million eligible adults — approximately 15% of those entitled to vote — are not registered to vote in the UK.<Cite nums={1} /> The gap is not evenly distributed: 18–24 year olds have registration rates of around 60–65%, compared to over 95% for those aged 65 and over. Private renters — who move frequently and may not update their registration — have significantly lower registration rates than homeowners, and certain ethnic minority groups and people in temporary or insecure housing are also substantially under-represented on the electoral roll.</p>
            <p>The switch from household registration to Individual Electoral Registration in 2014 — intended to improve accuracy and reduce fraud — had the effect of removing around 1 million people from the registers who had previously been registered under household registration but did not re-register individually.<Cite nums={2} /> Automatic voter registration — where citizens are registered when they interact with government services such as student loans, DVLA or benefits — is used in many comparable democracies but has not been implemented in the UK. The introduction of photo ID requirements for voting in England from 2024 added another potential barrier for eligible voters without qualifying ID.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-rates', label: 'Registration rates' },
          { id: 'sec-gaps', label: 'Registration gaps' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Eligible adults not registered" value="8" unit="million" direction="flat" polarity="up-is-bad" changeText={<>About 15% of eligible population<Cite nums={1} /></>} sparklineData={[9, 8.8, 8.5, 8.2, 7.9, 8.1, 8.2, 8.0, 8.0, 8.0, 8.0]} href="#sec-gaps" />
          <MetricCard label="Registration rate, 18–24 year olds" value="62" unit="%" direction="flat" polarity="up-is-good" changeText={<>Compared to 95%+ for over-65s<Cite nums={2} /></>} sparklineData={[68, 66, 63, 61, 60, 61, 62, 63, 62, 62, 62]} href="#sec-rates" />
          <MetricCard label="Overall electoral registration rate" value="85" unit="%" direction="flat" polarity="up-is-good" changeText={<>Broadly stable since IER introduced<Cite nums={1} /></>} sparklineData={[91, 88, 85, 84, 84, 85, 85, 85, 85, 85, 85]} href="#sec-rates" />
        </div>

        <ScrollReveal>
          <section id="sec-rates" className="mb-12">
            <LineChart title="Electoral registration rates, 2010–2024" subtitle="Overall registration rate and 18–24 year old registration rate (%), UK." series={chart1Series} annotations={annotations} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-gaps" className="mb-12">
            <LineChart title="Unregistered eligible voters and renter registration gap, 2010–2024" subtitle="Estimated unregistered eligible voters (millions) and private renter registration rate (%), UK." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Online registration" value="3 million" unit="registered online at 2024 election" description={<>Over 3 million people registered to vote online in the weeks before the 2024 general election, demonstrating the effectiveness of digital registration when combined with targeted awareness campaigns and deadline-driven urgency.<Cite nums={1} /></>} source="Source: Electoral Commission, 2024 General Election Registration Statistics." />
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

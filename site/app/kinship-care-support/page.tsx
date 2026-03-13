'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Kinship', dataset: 'State of the Nation Survey 2024', url: 'https://kinship.org.uk/state-of-the-nation', date: '2024' },
  { num: 2, name: 'DfE', dataset: 'Children Looked After in England 2023', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions', date: '2023' },
  { num: 3, name: 'DfE', dataset: 'Kinship Care Strategy 2023', url: 'https://www.gov.uk/government/publications/kinship-care-strategy', date: '2023' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface KinshipPoint {
  year: number;
  childrenThousands: number;
}

interface SGOPoint {
  year: number;
  ordersGranted: number;
}

interface PovertyPoint {
  year: number;
  inPovertyPct: number;
}

interface KinshipCareData {
  national: {
    childrenInKinshipCare: {
      timeSeries: KinshipPoint[];
      latestYear: number;
      latestThousands: number;
    };
    specialGuardianshipOrders: {
      timeSeries: SGOPoint[];
      latestYear: number;
      latestCount: number;
    };
    kinshipCarerPoverty: {
      timeSeries: PovertyPoint[];
      latestYear: number;
      latestPct: number;
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function KinshipCareSupportPage() {
  const [data, setData] = useState<KinshipCareData | null>(null);

  useEffect(() => {
    fetch('/data/kinship-care-support/kinship_care.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const kinshipSeries: Series[] = data
    ? [
        {
          id: 'children',
          label: 'Children in kinship care (thousands)',
          colour: '#F4A261',
          data: data.national.childrenInKinshipCare.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.childrenThousands,
          })),
        },
      ]
    : [];

  const sgoSeries: Series[] = data
    ? [
        {
          id: 'sgo',
          label: 'Special Guardianship Orders granted',
          colour: '#264653',
          data: data.national.specialGuardianshipOrders.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.ordersGranted,
          })),
        },
      ]
    : [];

  const povertyAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID — kinship carers excluded from furlough' },
    { date: new Date(2023, 5, 1), label: '2023: Kinship Care Strategy published' },
  ];

  const sgoAnnotations: Annotation[] = [
    { date: new Date(2015, 5, 1), label: '2015: SGO guidance strengthened' },
    { date: new Date(2022, 5, 1), label: '2022: Kinship: Breaking Point report' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Kinship Care" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Children &amp; Families"
          question="Are Britain's Hidden Carers Being Left Behind?"
          finding="180,000 children live in kinship care in England, raised by grandparents, aunts, uncles or family friends. They receive almost no financial support — just 2% of kinship carers qualify for foster carer payments."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Kinship care is the invisible backbone of the children's social care system. When a child cannot safely live with their parents, the first choice should be family — grandparents, aunts, uncles, older siblings, family friends. Around 180,000 children in England are raised this way, three times as many as are in foster care,<Cite nums={2} /> yet kinship carers receive almost no financial or practical support compared with foster carers, who receive allowances averaging £450–£700 per week.<Cite nums={1} />
            </p>
            <p>
              The poverty consequences are severe. Kinship carers are typically older — often grandparents who have already retired — and their income is disrupted by taking on an unplanned caring role. Forty-four per cent live in poverty.<Cite nums={1} /> They often take on children who have experienced neglect, abuse or parental addiction, yet receive none of the training, supervision or therapeutic support that foster carers are entitled to. The result is hidden hardship behind closed doors, absorbing a family crisis with no safety net.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-numbers', label: 'Children in kinship care' },
          { id: 'sec-sgo', label: 'Special Guardianship Orders' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Children in kinship care (England)"
              value="180,000"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="+18% since 2015 · Three times as many as in foster care"
              sparklineData={[152, 155, 158, 161, 165, 168, 170, 174, 177, 180]}
              href="#sec-numbers"
            />
            <MetricCard
              label="Kinship carers in poverty"
              value="44%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 35% in 2019 · Most receive no financial support"
              sparklineData={[35, 37, 38, 40, 42, 44]}
              href="#sec-numbers"
            />
            <MetricCard
              label="Special Guardianship Orders (annual)"
              value="5,500"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Record high · Courts increasingly using SGOs over adoption"
              sparklineData={[4200, 4400, 4600, 4800, 5000, 5100, 5200, 5300, 5400, 5500]}
              href="#sec-numbers"
            />
          </div>
        

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-numbers" className="mb-12">
            <LineChart
              title="Children in kinship care, England, 2015–2024"
              subtitle="Estimated number of children living in kinship arrangements. The true number may be higher as many informal arrangements are invisible to official data. Growth driven by rising care referrals, reduced foster placement availability, and court preference for family placements."
              series={kinshipSeries}
              annotations={povertyAnnotations}
              yLabel="Thousands"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-sgo" className="mb-12">
            <LineChart
              title="Special Guardianship Orders granted annually, England and Wales, 2015–2024"
              subtitle="SGOs give kinship carers legal parental responsibility without the child entering local authority care. Courts have increasingly preferred SGOs over adoption, particularly for older children and those from minority ethnic backgrounds."
              series={sgoSeries}
              annotations={sgoAnnotations}
              yLabel="Orders granted"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="Kinship Care"
            unit="Strategy 2023"
            description="The Kinship Care Strategy 2023 commits to piloting a kinship care allowance to bring financial support closer to foster carer rates. Ofsted now inspects the quality of support that kinship carers receive from local authorities. The Children and Families Act 2014 strengthened courts' duty to consider family placement before external foster care. Kinship charity provides free legal advice and peer support to kinship families."
            source="Source: DfE — Kinship Care Strategy, 2023. Kinship charity — State of Kinship Care, 2024."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
                </a>
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
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  );
}

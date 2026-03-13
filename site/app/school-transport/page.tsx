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
  { num: 1, name: 'DLUHC', dataset: 'Section 251 Local Authority Education Expenditure', url: 'https://www.gov.uk/government/collections/section-251-materials', date: '2024', note: 'SEND transport spending doubled from £750m (2018-19) to £1.5bn (2023-24); 10-15% of some authorities\' total education budgets' },
  { num: 2, name: 'DfE', dataset: 'SEND Statistics — Education, Health and Care Plans', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/education-health-and-care-plans', date: '2024', note: 'Children eligible rose from 98,000 in 2015 to 155,000 in 2024; some authorities paying £40,000+ per child for taxi provision' },
  { num: 3, name: 'DfE', dataset: 'Post-16 Transport and Travel Support Guidance', url: 'https://www.gov.uk/government/publications/post-16-transport-to-education-and-training', date: '2023', note: 'Transport costs cited as barrier to continuing education by 12% of young people in rural areas' },
  { num: 4, name: 'National Audit Office', dataset: 'Support for Pupils with SEND', url: 'https://www.nao.org.uk/reports/support-for-pupils-with-special-educational-needs-and-disabilities/', date: '2024', note: 'DSG deficit exceeding £4bn nationally; average SEND journey times risen from 42 to 62 minutes' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface SpendPoint {
  year: number;
  spendBn: number;
}

interface EligiblePoint {
  year: number;
  childrenThousands: number;
}

interface JourneyPoint {
  year: number;
  minutes: number;
}

interface Post16Point {
  year: number;
  spendGBP: number;
}

interface SchoolTransportData {
  national: {
    sendTransportSpend: {
      timeSeries: SpendPoint[];
      latestYear: number;
      latestBn: number;
    };
    eligibleChildren: {
      timeSeries: EligiblePoint[];
      latestYear: number;
      latestThousands: number;
    };
    averageJourneyTimeSEND: {
      timeSeries: JourneyPoint[];
      latestYear: number;
      latestMinutes: number;
    };
    post16SpendPerStudent: {
      timeSeries: Post16Point[];
      latestYear: number;
      latestGBP: number;
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

export default function SchoolTransportPage() {
  const [data, setData] = useState<SchoolTransportData | null>(null);

  useEffect(() => {
    fetch('/data/school-transport/school_transport.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const sendSpendSeries: Series[] = data
    ? [
        {
          id: 'send-spend',
          label: 'SEND transport spend',
          colour: '#E63946',
          data: data.national.sendTransportSpend.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.spendBn,
          })),
        },
      ]
    : [];

  const eligibleSeries: Series[] = data
    ? [
        {
          id: 'eligible',
          label: 'Children eligible for free transport',
          colour: '#F4A261',
          data: data.national.eligibleChildren.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.childrenThousands,
          })),
        },
      ]
    : [];

  const post16Series: Series[] = data
    ? [
        {
          id: 'post16',
          label: 'Post-16 transport spend per student',
          colour: '#264653',
          data: data.national.post16SpendPerStudent.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.spendGBP,
          })),
        },
      ]
    : [];

  const sendSpendAnnotations: Annotation[] = [
    { date: new Date(2015, 5, 1), label: '2015: SEND reforms take effect' },
    { date: new Date(2020, 5, 1), label: '2020: COVID disruption' },
    { date: new Date(2023, 5, 1), label: '2023: DSG deficit crisis' },
  ];

  const eligibleAnnotations: Annotation[] = [
    { date: new Date(2014, 8, 1), label: '2014: Children and Families Act' },
    { date: new Date(2020, 5, 1), label: '2020: COVID disruption' },
  ];

  const post16Annotations: Annotation[] = [
    { date: new Date(2017, 5, 1), label: '2017: Participation age raised to 18' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="School Transport" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="Can Your Child Actually Get to School?"
          finding="Local authority SEND transport costs have doubled from £750m to £1.5bn in five years. Over 150,000 children with EHCPs are entitled to free transport, yet some travel 90 minutes or more each way. Rural bus routes have been cut by more than 20% since 2015."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Home-to-school transport is a statutory duty for local authorities in England: children living beyond distance thresholds (two miles for under-eights, three miles for over-eights) from their nearest suitable school are entitled to free transport. For children with special educational needs and disabilities, this duty extends further — transport must be provided where it is specified in Section H of an Education, Health and Care Plan. The system is under extraordinary pressure. SEND transport spending by local authorities has doubled from £750 million in 2018-19 to over £1.5 billion in 2023-24, now consuming 10-15% of some authorities' total education budgets.<Cite nums={1} /> The number of children eligible has risen in lockstep with the explosion in EHCPs, from 98,000 in 2015 to over 155,000 in 2024. Many authorities have outsourced transport to private operators at inflated contract rates, with some paying over £40,000 per year for a single child's taxi provision.<Cite nums={2} /> The Dedicated Schools Grant deficit — now exceeding £4 billion nationally — is being driven in significant part by these spiralling transport obligations.<Cite nums={4} />
            </p>
            <p>
              The human cost is borne by children. Some SEND pupils with EHCPs are travelling 90 minutes or more each way because their named school is the only provision that can meet their needs within the local authority area — or beyond it. Average SEND journey times have risen from 42 minutes in 2015 to 62 minutes in 2024.<Cite nums={4} /> In rural areas, the picture is compounded by the loss of mainstream school bus routes: over 20% of non-statutory rural school bus services have been cut since 2015 as councils have withdrawn discretionary funding. For non-eligible families on low incomes, transport costs of £500 to £1,000 per year per child represent a genuine barrier to school choice. Post-16 transport is not free at all, creating a documented barrier to college attendance in rural and semi-rural areas — the DfE's own research found that transport costs were cited as a reason for not continuing in education by 12% of young people in rural areas.<Cite nums={3} /> Getting to school should be simple. For a growing number of families, it is anything but.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-spend', label: 'SEND spending' },
          { id: 'sec-eligible', label: 'Eligible children' },
          { id: 'sec-post16', label: 'Post-16 transport' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="SEND transport spend"
            value="£1.52bn"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="+103% since 2015 · Up from £750m"
            sparklineData={[0.75, 0.82, 0.91, 1.01, 1.12, 1.08, 1.18, 1.29, 1.41, 1.52]}
            href="#sec-spend"
          />
          <MetricCard
            label="Children eligible for free transport"
            value="155,000"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="+58% since 2015 · Up from 98,000"
            sparklineData={[98, 104, 111, 119, 126, 124, 131, 139, 147, 155]}
            href="#sec-eligible"
          />
          <MetricCard
            label="Average journey time SEND"
            value="62"
            unit="mins"
            direction="up"
            polarity="up-is-bad"
            changeText="+20 mins since 2015 · Some children 90+ mins"
            sparklineData={[42, 44, 47, 50, 53, 48, 52, 56, 59, 62]}
            href="#sec-spend"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-spend" className="mb-12">
            <LineChart
              title="Local authority SEND transport spending, England, 2015–2024"
              subtitle="Total expenditure on home-to-school transport for children with EHCPs. Costs have more than doubled in a decade, driven by rising EHCP numbers, specialist placement distances, and outsourced private operator contracts."
              series={sendSpendSeries}
              annotations={sendSpendAnnotations}
              yLabel="£ billions"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-eligible" className="mb-12">
            <LineChart
              title="Children eligible for free school transport, England, 2015–2024"
              subtitle="Number of children with Education, Health and Care Plans entitled to local authority-funded home-to-school transport. Growth tracks the national rise in EHCPs issued under the 2014 Children and Families Act."
              series={eligibleSeries}
              annotations={eligibleAnnotations}
              yLabel="Thousands"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-post16" className="mb-12">
            <LineChart
              title="Post-16 transport spend per student, England, 2015–2024"
              subtitle="Average local authority expenditure per student receiving funded post-16 transport. Post-16 transport is not a statutory entitlement — costs fall on families or discretionary LA budgets, creating barriers to college attendance in rural areas."
              series={post16Series}
              annotations={post16Annotations}
              yLabel="£ per student"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="Shared SEND"
            unit="transport hubs"
            description="Some local authorities have introduced shared SEND transport hubs, reducing journey times by 20-30% and costs per child by 15%. Digital route optimisation is being trialled across 12 authorities, using real-time data to consolidate routes, reduce empty running, and shorten journey times for the most vulnerable children."
            source="Source: DLUHC — Section 251 Local Authority Education Expenditure. DfE — SEND Statistics. National Audit Office — Support for Pupils with SEND, 2024."
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

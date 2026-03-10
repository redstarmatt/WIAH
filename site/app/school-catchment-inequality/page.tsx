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

// ── Types ────────────────────────────────────────────────────────────────────

interface PremiumPoint {
  year: number;
  premiumThousands: number;
}

interface FsmRatioPoint {
  year: number;
  fsmRatioVsAreaAvg: number;
}

interface AppealsPoint {
  year: number;
  appealsUpheldThousands: number;
}

interface CatchmentData {
  national: {
    housePricePremium: {
      timeSeries: PremiumPoint[];
      latestYear: number;
      latestThousands: number;
      note: string;
    };
    fsmRatio: {
      timeSeries: FsmRatioPoint[];
      latestYear: number;
      latestRatio: number;
      note: string;
    };
    admissionsAppeals: {
      timeSeries: AppealsPoint[];
      latestYear: number;
      latestThousands: number;
      note: string;
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

export default function SchoolCatchmentInequalityPage() {
  const [data, setData] = useState<CatchmentData | null>(null);

  useEffect(() => {
    fetch('/data/school-catchment-inequality/catchment.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const premiumSeries: Series[] = data
    ? [{
        id: 'premium',
        label: 'House price premium near top schools (£k)',
        colour: '#2A9D8F',
        data: data.national.housePricePremium.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.premiumThousands,
        })),
      }]
    : [];

  const appealsSeries: Series[] = data
    ? [{
        id: 'appeals',
        label: 'Admissions appeals upheld (thousands)',
        colour: '#264653',
        data: data.national.admissionsAppeals.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.appealsUpheldThousands,
        })),
      }]
    : [];

  const premiumAnnotations: Annotation[] = [
    { date: new Date(2016, 5, 1), label: '2016: Academisation accelerates choice pressures' },
    { date: new Date(2021, 5, 1), label: '2021: Post-pandemic house price boom' },
  ];

  const appealsAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic reduces appeals' },
    { date: new Date(2022, 5, 1), label: '2022: Record oversubscription in urban schools' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="School Catchment Inequality" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="School Catchment Inequality"
          question="Does Where You Live Determine Where Your Child Goes to School?"
          finding="The most popular state schools have average house prices within their catchment areas that are £40,000 higher than the surrounding neighbourhood. FSM eligibility at oversubscribed schools is 40% below local averages."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              England's schools admissions system is formally blind to income. In practice, the combination of catchment areas, sibling priority, and proximity criteria has created a geography of educational access that closely mirrors the housing market. Families who can afford to live near Outstanding or Good schools pay a measurable premium to do so — averaging £40,000 in 2024 and rising every year since 2015. This catchment premium is a de facto private education levy: you pay it in house prices rather than school fees.
            </p>
            <p>
              The social sorting effect shows clearly in Free School Meal data. Oversubscribed schools — those turning away applicants — have FSM rates approximately 40% lower than the surrounding area average, meaning that the most sought-after state schools serve proportionally far fewer disadvantaged children than their communities contain. This is not the result of discriminatory admissions policy; it is the mechanical consequence of catchment geography and house prices. The trend has been remarkably stable since 2018, suggesting that Pupil Premium funding and Fair Access Protocols have not materially shifted the underlying pattern.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-premium', label: 'House Price Premium' },
          { id: 'sec-appeals', label: 'Admissions Appeals' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="House price premium near top schools"
              value="£40,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Average premium to live in best school catchment · Up from £28k in 2015"
              sparklineData={[28, 30, 31, 33, 34, 35, 36, 38, 39, 40]}
              href="#sec-premium"
            />
            <MetricCard
              label="FSM pupils at oversubscribed schools"
              value="40% below avg"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Top schools consistently less deprived than their local area"
              sparklineData={[0.62, 0.61, 0.60, 0.59, 0.61, 0.60]}
              href="#sec-premium"
            />
            <MetricCard
              label="School admissions appeals upheld"
              value="3,800"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Record 2024 · Middle-class families gaming admissions criteria"
              sparklineData={[3.2, 2.9, 3.1, 3.4, 3.6, 3.8]}
              href="#sec-premium"
            />
          </div>
        

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-premium" className="mb-12">
            <LineChart
              title="House price premium within top-rated school catchments, England, 2015–2024"
              subtitle="Average additional house price (£ thousands) within 200m of Outstanding or Good-rated state schools versus surrounding neighbourhood. Up from £28,000 in 2015 to £40,000 in 2024."
              series={premiumSeries}
              annotations={premiumAnnotations}
              yLabel="£ thousands premium"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-appeals" className="mb-12">
            <LineChart
              title="School admissions appeals upheld in favour of parents, England, 2019–2024"
              subtitle="Successful appeals to independent appeal panels against school place decisions. Rising appeals reflect growing competition for oversubscribed schools and families challenging catchment decisions."
              series={appealsSeries}
              annotations={appealsAnnotations}
              yLabel="Thousands upheld"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="Pupil Premium: £1,480 per FSM pupil"
            unit=""
            description="Pupil Premium allocates £1,480 per FSM pupil to schools. Fair Access Protocols require schools to admit vulnerable pupils outside normal admissions rounds. Some local authorities are piloting social randomness (lotteries) in oversubscribed school admissions — Brighton famously used this approach. The DfE's SEND Review and inclusion agenda encourages schools to become more representative of their communities. Evidence from lottery admissions suggests greater socioeconomic diversity does not reduce attainment at already high-performing schools."
            source="Source: DfE — School admissions appeals 2024; Nationwide building society school catchment premium analysis 2024."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
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

'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface GenderPayGapData {
  national: {
    genderPayGap: {
      timeSeries: Array<{ year: number; fullTimeGapPct: number }>;
      latestYear: number;
      latestFullTimePct: number;
      latestAllWorkersPct: number;
    };
    bySector: Array<{ sector: string; gapPct: number }>;
    boardroomRepresentation: {
      timeSeries: Array<{ year: number; ftse350WomenPct: number }>;
      latestYear: number;
      latestPct: number;
    };
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function GenderPayGapPage() {
  const [data, setData] = useState<GenderPayGapData | null>(null);

  useEffect(() => {
    fetch('/data/gender-pay-gap/gender_pay_gap.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const payGapSeries: Series[] = data
    ? [{
        id: 'payGap',
        label: 'Gender pay gap (%)',
        colour: '#F4A261',
        data: data.national.genderPayGap.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.fullTimeGapPct,
        })),
      }]
    : [];

  const boardroomSeries: Series[] = data
    ? [{
        id: 'boardroom',
        label: 'Women on boards (%)',
        colour: '#2A9D8F',
        data: data.national.boardroomRepresentation.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.ftse350WomenPct,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Gender Pay Gap" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Gender Pay Gap"
          question="How Wide Is Britain's Gender Pay Gap?"
          finding="The UK gender pay gap stands at 14.3% for full-time workers — women earn 86p for every £1 earned by men. For all workers (including part-time), the gap rises to 19.7%. The gap persists in every sector and widens sharply after childbirth. At current rates of change, the gap will not close until 2050."
          colour="#F4A261"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Women working full-time in Britain earn 86p for every £1 earned by men — a median gender pay gap of 14.3%. When part-time workers are included the gap widens to 19.7%, reflecting the disproportionate concentration of women in lower-paid roles. Financial services carries the largest sector gap at 28.1%, with a bonus gap of 40%. Since mandatory reporting was introduced in April 2017 for employers with 250 or more staff, 78% still report a gap in favour of men. The full-time gap has fallen from 27.5% in 1997 but is projected not to close until the mid-2040s at current rates. The phased expansion of funded childcare from 15 to 30 hours for children from nine months — rolled out 2024–25 — is the most significant structural intervention in years.</p>
            <p>The gap is near-zero for women in their twenties, then widens sharply after childbirth: by the time a first child reaches 12, mothers earn 33% less than fathers (IFS). Women make up 77% of social care workers and 85% of NHS nurses but only 18% of engineers, and female-dominated sectors are systematically undervalued. Black women earn 20% less than white men; Pakistani and Bangladeshi women face the largest intersectional gaps. Shared Parental Leave has been taken up by only 2% of eligible fathers, doing little to redistribute caring responsibilities. Progress at boardroom level — FTSE 350 boards reached 40% female representation in 2023, up from 13% in 2012 — has not translated into the wider executive pipeline.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-gap', label: 'Pay Gap Trend' },
          { id: 'sec-boardroom', label: 'Boardroom' },
          { id: 'sec-sectors', label: 'By Sector' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Gender pay gap (full-time workers)"
              value="14.3%"
              direction="down"
              polarity="up-is-bad"
              changeText="2023 · Women earn 86p per £1 · Down from 19.7% in 2012 · All workers (incl. part-time): 19.7%"
              sparklineData={[19.7, 19.7, 19.1, 18.4, 18.1, 17.4, 17.1, 17.3, 15.5, 15.4, 14.9, 14.3]}
              href="#sec-overview"/>
            <MetricCard
              label="Gender pay gap in financial services"
              value="28.1%"
              direction="flat"
              polarity="up-is-bad"
              changeText="2023 · Highest sector gap · Bonus gap even larger at 40% · Pay gap widens sharply after maternity leave"
              sparklineData={[35, 34, 33, 32, 31, 30, 29, 29, 28.5, 28.3, 28.2, 28.1]}
              href="#sec-gap"/>
            <MetricCard
              label="Women on FTSE 350 boards"
              value="40%"
              direction="up"
              polarity="up-is-good"
              changeText="2023 · Up from 13% in 2012 · FTSE Women Leaders target met · But only 9% are executive directors"
              sparklineData={[13.0, 19.6, 24.9, 28.0, 33.0, 38.5, 40.0]}
              href="#sec-boardroom"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-gap" className="mb-12">
            <LineChart
              title="UK gender pay gap (full-time workers), 2012–2023"
              subtitle="Difference between men's and women's median hourly earnings (excluding overtime) as a percentage of men's median hourly earnings."
              series={payGapSeries}
              annotations={[
                { date: new Date(2017, 3, 1), label: '2017: Mandatory GPG reporting' },
              ]}
              yLabel="Pay gap (%)"
              source={{
                name: 'ONS',
                dataset: 'Annual Survey of Hours and Earnings (ASHE)',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-boardroom" className="mb-12">
            <LineChart
              title="Women on FTSE 350 boards, 2012–2023"
              subtitle="Percentage of women on FTSE 350 company boards. Hampton-Alexander target: 40% by end of 2022."
              series={boardroomSeries}
              yLabel="Women board members (%)"
              source={{
                name: 'FTSE Women Leaders',
                dataset: 'FTSE Women Leaders Review',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-sectors" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Gender pay gap by sector, UK, 2023</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Median gender pay gap across selected sectors. Figures exclude bonuses.</p>
            {data && (
              <div className="space-y-3">
                {data.national.bySector.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-48 text-sm text-wiah-black flex-shrink-0">{item.sector}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.gapPct / 28.1) * 100}%`, backgroundColor: '#F4A261' }}
                      />
                    </div>
                    <div className="w-12 text-right text-sm font-mono text-wiah-black">{item.gapPct}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS — Annual Survey of Hours and Earnings (ASHE) 2023</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="40%"
            unit="of FTSE 350 board members are now women — up from 13% in 2012"
            description="The gender pay gap for full-time workers has narrowed from 19.7% in 2012 to 14.3% in 2023, the lowest on record. FTSE 350 boards now have 40% female representation, meeting the Hampton-Alexander target, up from 13% in 2012. Mandatory gender pay gap reporting (since April 2017) has driven transparency and accountability across large employers. The proportion of women in senior management roles has risen from 32% in 2012 to 44% in 2023. Shared Parental Leave — introduced 2015 — allows fathers to take up to 50 weeks of leave, potentially reducing the career penalty women face at childbirth, though take-up remains low at around 2%."
            source="Source: ONS — Gender Pay Gap in the UK 2023; FTSE Women Leaders Review 2023."
          />
        </ScrollReveal>

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
      </main>
    </>
  );
}

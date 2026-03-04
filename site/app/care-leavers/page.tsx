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

interface CareLeaversData {
  national: {
    childrenInCare: {
      timeSeries: Array<{ year: number; childrenCount: number }>;
      latestYear: number;
      latestCount: number;
      leavingCareAnnually: number;
    };
    leaverOutcomes: {
      timeSeries: Array<{ year: number; neetPct: number }>;
      latestYear: number;
      latestNeetPct: number;
      universityPct: number;
      homelessWithin2YearsPct: number;
    };
    byOutcomeType: Array<{ outcome: string; pct: number }>;
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

export default function CareLeaversPage() {
  const [data, setData] = useState<CareLeaversData | null>(null);

  useEffect(() => {
    fetch('/data/care-leavers/care_leavers.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const childrenInCareSeries: Series[] = data
    ? [{
        id: 'childrenInCare',
        label: 'Children in care',
        colour: '#264653',
        data: data.national.childrenInCare.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.childrenCount,
        })),
      }]
    : [];

  const neetSeries: Series[] = data
    ? [{
        id: 'neet',
        label: 'NEET rate (%)',
        colour: '#E63946',
        data: data.national.leaverOutcomes.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.neetPct,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Care Leavers" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Care Leavers"
          question="What Happens to Children Who Leave the Care System?"
          finding="95,000 children are in care in England. Each year 10,000 young people leave care aged 16&ndash;21 with 37% becoming NEET within a year. Care leavers are 4 times more likely to be criminalised. 25% become homeless within 2 years. Just 13% go to university, compared to 43% of the general population."
          colour="#264653"
          preposition="for"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England has 108,000 children in care &mdash; a number that has risen almost every year for a decade. Around 13,000 leave the care system annually, mostly between 16 and 18, and the outcomes data is stark. Only 6% of care leavers go into higher education, against 43% of the general population. A quarter of homeless adults have spent time in care. Twenty-four percent of the adult prison population were looked-after children. Care leavers are overrepresented in every negative outcome measure that exists &mdash; unemployment, mental ill health, substance dependency, early parenthood. These are not marginal statistics. They describe a group of young people who entered adulthood through a state system and, in very large numbers, did not get what that system was meant to provide.</p>
            <p>The transition out of care is often described as a &ldquo;cliff edge.&rdquo; Most young people leave at 18 &mdash; the age at which they become legal adults &mdash; with no family home to fall back on, no parental safety net, and whatever preparation a hard-pressed local authority has been able to provide. The Staying Put programme, introduced in 2014, allows young people in foster care to remain with their foster family until 21, and evidence on its outcomes is positive. But uptake is inconsistent: in some local authorities fewer than a third of eligible young people stay put, in others over two thirds. Staying Close, the equivalent programme for those leaving residential care, operates at even smaller scale. A reasonable parent would not expect their 18-year-old to leave home with a bag, a flat allocation, and a fortnightly support visit. Corporate parenting &mdash; the local authority&apos;s legal duty to act as a good parent &mdash; routinely falls short of that standard.</p>
            <p>Looked-after children are four times more likely to have a diagnosable mental health disorder than their peers, and PTSD is common, reflecting the abuse, neglect, or family breakdown that brought many into care in the first place. The system has tools designed to address educational disadvantage: virtual school heads coordinate support across school placements, and Personal Education Plans (PEPs) are legally required for every looked-after child. But implementation is patchy, and the quality of a PEP depends heavily on the school and the individual responsible for it. The deeper problem is timing: the transition from Child and Adolescent Mental Health Services (CAMHS) to adult mental health services happens at 18 &mdash; the same moment care itself ends. Young people lose their support structures simultaneously, precisely when they are at their most vulnerable.</p>
            <p>Placement instability is one of the most documented harms in the care system. The average looked-after child experiences three placements, and each move typically means a change of school. Research estimates each school move sets back educational progress by two to three months; multiple moves across primary and secondary school compound into significant attainment gaps that are almost impossible to close. Independent Reviewing Officers are supposed to provide oversight of each child&apos;s care plan and hold local authorities to account, but the system is under-resourced and their powers limited. The residential children&apos;s care sector has attracted significant private equity investment over the past decade, and the profitability of placements has drawn scrutiny &mdash; with Ofsted data showing that privately run residential homes are more likely to receive inadequate ratings than local authority or voluntary sector provision.</p>
            <p>The Department for Education tracks care leaver outcomes through surveys at ages 19, 20, and 21. After that, the data stops. What happens to care leavers at 25, 30, or 40 is largely invisible to the state that raised them. The category &ldquo;looked-after children&rdquo; is also broader than it appears: it encompasses children in foster families, kinship care with relatives, residential children&apos;s homes, and semi-independent supported accommodation &mdash; very different experiences with different outcome profiles, often aggregated in ways that obscure what is actually driving the numbers. Care leavers who disengage from leaving care services &mdash; the group most likely to be struggling &mdash; disappear from the dataset entirely. Mental health outcomes in particular are poorly recorded: there is no systematic national data on how many care leavers are in contact with adult mental health services, receiving treatment, or in crisis.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-care', label: 'Children in Care' },
          { id: 'sec-outcomes', label: 'Leaver Outcomes' },
          { id: 'sec-breakdown', label: 'Outcome Breakdown' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Children in care (England)"
              value="95,000"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Up from 67K in 2012 &middot; 10,000 leave care annually aged 16&ndash;21 &middot; Neglect or abuse main reason for entry"
              sparklineData={[67050, 68060, 68840, 69540, 70440, 72670, 75420, 78150, 80850, 82170, 84010, 95000]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Care leavers who are NEET (aged 17&ndash;21)"
              value="37%"
              direction="flat"
              polarity="up-is-bad"
              changeText="2023 &middot; General population NEET rate: 11% &middot; 3x higher &middot; Young people leaving care at 16 most at risk"
              sparklineData={[38, 38, 39, 37, 41, 38, 37, 37]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Care leavers going to university"
              value="13%"
              direction="up"
              polarity="up-is-good"
              changeText="2023 &middot; General population: 43% &middot; Gap narrowing slowly &middot; Bursaries and guaranteed university accommodation helping"
              sparklineData={[6, 7, 8, 9, 10, 11, 12, 13]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-care" className="mb-12">
            <LineChart
              title="Children in care, England, 2012&ndash;2023"
              subtitle="Total number of children and young people in care in England, measured at 31 March each year."
              series={childrenInCareSeries}
              annotations={[
                { date: new Date(2020, 5, 1), label: '2020: COVID-19' },
              ]}
              yLabel="Number of children"
              source={{
                name: 'DfE',
                dataset: 'Children Looked After in England',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-outcomes" className="mb-12">
            <LineChart
              title="Care leavers not in education, employment or training (NEET), 2016&ndash;2023"
              subtitle="Percentage of care leavers aged 17&ndash;21 not in education, employment or training at 31 March each year."
              series={neetSeries}
              yLabel="NEET rate (%)"
              source={{
                name: 'DfE',
                dataset: 'Care Leavers in England',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-breakdown" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Care leaver outcomes, England, 2023</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Key outcomes for care leavers aged 17&ndash;21 at 31 March 2023.</p>
            {data && (
              <div className="space-y-3">
                {data.national.byOutcomeType.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-56 text-sm text-wiah-black flex-shrink-0">{item.outcome}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.pct / 63) * 100}%`, backgroundColor: '#264653' }}
                      />
                    </div>
                    <div className="w-12 text-right text-sm font-mono text-wiah-black">{item.pct}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: DfE &mdash; Care Leavers in England 2023</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="13%"
            unit="of care leavers now go to university &mdash; up from 6% in 2012, as bursaries and support expand"
            description="University participation among care leavers has doubled from 6% in 2012 to 13% in 2023, driven by the Care Leaver Covenant and university bursaries typically worth &pound;1,000&ndash;&pound;5,000 per year. All 24 Russell Group universities now guarantee care leavers accommodation during vacations and waive some entry requirements. The Staying Put policy (2014) requires local authorities to support care leavers remaining with foster carers until age 21 &mdash; now extended to 25 in many councils. Virtual School Heads, mandatory for looked-after children since 2014, have improved GCSE attainment rates. The Leaving Care (Staying Close Support) Act 2021 extended local authority duties to provide support up to age 25."
            source="Source: DfE &mdash; Care Leavers in England 2023; UCAS &mdash; End of Cycle Data Resources 2023."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} &mdash; {src.dataset}
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

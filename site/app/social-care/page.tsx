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

interface SocialCareData {
  national: {
    adultSocialCare: {
      timeSeries: Array<{ year: number; requestsMillions: number }>;
      latestYear: number;
      latestMillions: number;
      receivingCareMillions: number;
    };
    workforceVacancies: {
      timeSeries: Array<{ year: number; vacancyRatePct: number }>;
      latestYear: number;
      latestVacancyRatePct: number;
      vacancyCount: number;
    };
    byCareType: Array<{ careType: string; recipientsThousands: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Component ────────────────────────────────────────────────────────────────

export default function SocialCarePage() {
  const [data, setData] = useState<SocialCareData | null>(null);

  useEffect(() => {
    fetch('/data/social-care/social_care.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const requestsSeries: Series[] = data
    ? [{
        id: 'requests',
        label: 'Annual social care service requests (millions)',
        colour: '#F4A261',
        data: data.national.adultSocialCare.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.requestsMillions,
        })),
      }]
    : [];

  const vacancySeries: Series[] = data
    ? [{
        id: 'vacancy',
        label: 'Social care vacancy rate (%)',
        colour: '#F4A261',
        data: data.national.workforceVacancies.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.vacancyRatePct,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Social Care" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Social Care"
          question="Who Is Actually Caring for Britain&apos;s Elderly and Disabled?"
          finding="1.5 million people in England receive publicly funded social care. 532,000 care home places are available but 165,000 beds are unfilled due to staff shortages. Adult social care has a funding gap of &pound;8 billion. 17,900 delayed discharges from hospital daily are due to lack of social care packages."
          colour="#F4A261"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England&apos;s adult social care system handles 1.9 million requests for support each year, yet only 1.5 million people receive publicly funded care &mdash; a gap that leaves hundreds of thousands relying on family, charity or nothing at all. An estimated 8 million older adults have some form of care need, a figure rising as the population ages. The Association of Directors of Adult Social Services puts the funding shortfall at &pound;8 billion, and 107 councils have raised their maximum personal care charges to claw back costs. The Care Act 2014 established a legal right to assessment, but the promised cap on lifetime care costs has been delayed three times &mdash; from October 2023 to 2025, then postponed indefinitely.</p>
            <p>Anyone with assets above &pound;23,250 must fund their own care, a threshold unchanged since 2010. The Dilnot Commission recommended a lifetime cap of &pound;35,000 in 2011; by 2023 Andrew Dilnot himself suggested &pound;86,000 would be required, yet neither figure has been implemented. The workforce holding the system together numbers 1.52 million &mdash; larger than the NHS &mdash; but carries 152,000 vacancies, a rate of 9.9%. Average pay sits at &pound;11.15 per hour, well below the &pound;12.50 earned by NHS healthcare assistants doing comparable work. Annual staff turnover runs at 28.3%, higher than the fast-food sector. Post-Brexit, providers turned to international recruitment: 70,000 Health and Care Worker visas were issued in 2022/23 alone.</p>
            <p>The consequences fall hardest on hospitals. On any given day, between 13,500 and 17,900 patients who are medically fit for discharge remain in NHS beds because no social care package is available &mdash; costing the health service roughly &pound;1 billion a year in occupied capacity. Geography compounds the problem: annual spending per person on adult social care ranges from &pound;470 in some rural councils to over &pound;1,200 in inner London, a disparity driven by council tax bases that structurally disadvantage the most deprived areas. The government&apos;s People at the Heart of Care white paper (2021), the rollout of Integrated Care Systems and the Home First discharge approach represent attempts at reform, but none addresses the central question of who pays.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-requests', label: 'Care Demand' },
          { id: 'sec-workforce', label: 'Workforce' },
          { id: 'sec-types', label: 'By Care Type' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="People requesting adult social care (annual)"
              value="1.9M"
              direction="up"
              polarity="up-is-bad"
              changeText="2022/23 &middot; 1.5M receiving funded care &middot; Up from 1.6M during COVID &middot; Ageing population driving demand"
              sparklineData={[1790, 1810, 1840, 1870, 1850, 1600, 1720, 1830, 1900]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Social care workforce vacancy rate"
              value="9.9%"
              direction="down"
              polarity="up-is-bad"
              changeText="2023 &middot; 152,000 vacancies &middot; Down from 10.7% peak &middot; Overseas recruitment filling gap post-Brexit"
              sparklineData={[6.6, 7.0, 8.0, 8.0, 7.0, 10.0, 10.7, 9.9]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Annual social care funding gap"
              value="&pound;8bn"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Estimated by Association of Directors &middot; Councils cutting services &middot; Health &amp; Care Act 2022 reforms delayed"
              sparklineData={[3, 4, 5, 5.5, 6, 6.5, 7, 7.5, 8]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-requests" className="mb-12">
            <LineChart
              title="Adult social care service requests, England, 2015&ndash;2023"
              subtitle="Annual number of people requesting adult social care support (millions)."
              series={requestsSeries}
              yLabel="Requests (millions)"
              source={{
                name: 'NHS England',
                dataset: 'Adult Social Care Activity and Finance Report',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-workforce" className="mb-12">
            <LineChart
              title="Adult social care vacancy rate, England, 2016&ndash;2023"
              subtitle="Percentage of filled and unfilled care worker posts that are currently vacant."
              series={vacancySeries}
              yLabel="Vacancy rate (%)"
              source={{
                name: 'Skills for Care',
                dataset: 'The State of the Adult Social Care Sector and Workforce',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-types" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Adults receiving social care by type of care, England, 2023</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Number of service users (thousands) by primary care type.</p>
            {data && (
              <div className="space-y-3">
                {data.national.byCareType.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.careType}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.recipientsThousands / 580) * 100}%`, backgroundColor: '#F4A261' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.recipientsThousands}K</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: NHS England &mdash; Adult Social Care Activity and Finance Report 2023</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="&pound;500M"
            unit="workforce fund to improve social care pay and training over 3 years"
            description="The People at the Heart of Care white paper (December 2021) committed to a &pound;500 million workforce development fund over three years to improve pay, training and career pathways in adult social care. From February 2022, overseas care workers became eligible for the Health and Care Worker visa, enabling international recruitment &mdash; 70,000 visas issued in 2022/23, stabilising the workforce. The NHS Discharge Taskforce has reduced delayed discharges by 15% since its 2022 launch through improved social care commissioning. Local authorities in Scotland and Wales provide free personal care to eligible adults, reducing out-of-pocket costs compared with the means-tested system in England."
            source="Source: NHS England &mdash; Adult Social Care Activity Report 2022/23; Skills for Care &mdash; State of the Social Care Workforce 2023."
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

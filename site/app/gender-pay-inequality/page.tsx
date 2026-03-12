'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface OverallGapPoint {
  year: number;
  fullTimePct: number;
  allEmployeesPct: number;
}

interface AgeGroupGapPoint {
  year: number;
  age18to21: number;
  age22to29: number;
  age30to39: number;
  age40to49: number;
  age50to59: number;
  age60plus: number;
}

interface SectorGapPoint {
  year: number;
  construction: number;
  financeInsurance: number;
  educationSector: number;
  healthSocialCare: number;
  publicAdmin: number;
  retailHospitality: number;
}

interface GenderPayData {
  overallGap: OverallGapPoint[];
  gapByAgeGroup: AgeGroupGapPoint[];
  gapBySector: SectorGapPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 3, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function GenderPayInequalityPage() {
  const [data, setData] = useState<GenderPayData | null>(null);

  useEffect(() => {
    fetch('/data/gender-pay-inequality/gender_pay_inequality.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const overallGapSeries: Series[] = data
    ? [
        {
          id: 'full-time',
          label: 'Full-time employees',
          colour: '#F4A261',
          data: data.overallGap.map(d => ({
            date: yearToDate(d.year),
            value: d.fullTimePct,
          })),
        },
        {
          id: 'all-employees',
          label: 'All employees',
          colour: '#E63946',
          data: data.overallGap.map(d => ({
            date: yearToDate(d.year),
            value: d.allEmployeesPct,
          })),
        },
      ]
    : [];

  const ageGroupSeries: Series[] = data
    ? [
        {
          id: 'age-18-21',
          label: '18–21',
          colour: '#2A9D8F',
          data: data.gapByAgeGroup.map(d => ({
            date: yearToDate(d.year),
            value: d.age18to21,
          })),
        },
        {
          id: 'age-30-39',
          label: '30–39',
          colour: '#F4A261',
          data: data.gapByAgeGroup.map(d => ({
            date: yearToDate(d.year),
            value: d.age30to39,
          })),
        },
        {
          id: 'age-40-49',
          label: '40–49',
          colour: '#E63946',
          data: data.gapByAgeGroup.map(d => ({
            date: yearToDate(d.year),
            value: d.age40to49,
          })),
        },
        {
          id: 'age-50-59',
          label: '50–59',
          colour: '#264653',
          data: data.gapByAgeGroup.map(d => ({
            date: yearToDate(d.year),
            value: d.age50to59,
          })),
        },
      ]
    : [];

  const sectorSeries: Series[] = data
    ? [
        {
          id: 'construction',
          label: 'Construction',
          colour: '#E63946',
          data: data.gapBySector.map(d => ({
            date: yearToDate(d.year),
            value: d.construction,
          })),
        },
        {
          id: 'finance',
          label: 'Finance & Insurance',
          colour: '#F4A261',
          data: data.gapBySector.map(d => ({
            date: yearToDate(d.year),
            value: d.financeInsurance,
          })),
        },
        {
          id: 'health-social',
          label: 'Health & Social Care',
          colour: '#264653',
          data: data.gapBySector.map(d => ({
            date: yearToDate(d.year),
            value: d.healthSocialCare,
          })),
        },
        {
          id: 'retail-hospitality',
          label: 'Retail & Hospitality',
          colour: '#2A9D8F',
          data: data.gapBySector.map(d => ({
            date: yearToDate(d.year),
            value: d.retailHospitality,
          })),
        },
      ]
    : [];

  const latestOverall = data?.overallGap[data.overallGap.length - 1];
  const prevOverall = data?.overallGap[data.overallGap.length - 2];
  const peak1997 = data?.overallGap[0];

  const fullTimeChange = latestOverall && prevOverall
    ? (latestOverall.fullTimePct - prevOverall.fullTimePct).toFixed(1)
    : '-0.8';

  const allEmployeesChange = latestOverall && prevOverall
    ? (latestOverall.allEmployeesPct - prevOverall.allEmployeesPct).toFixed(1)
    : '-1.2';

  return (
    <>
      <TopicNav topic="Economy & Work" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="How much less do women earn than men?"
          finding="The gender pay gap has halved since 1997 but remains stubbornly persistent. Full-time women earn 6.9% less than men; when part-time work is included, the gap widens to 13.1%. At the current pace of change, full parity is more than 40 years away."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The headline numbers tell a story of slow, uneven progress. Among full-time employees, the median gender pay gap fell from 17.4% in 1997 to 6.9% in 2024 — a genuine narrowing driven by legislation, transparency, and generational shifts in women's workforce participation. But this figure flatters reality. When all employees are counted — including the millions of women in part-time roles — the gap sits at 13.1%. Women are far more likely to work part-time than men, and part-time work pays less per hour than full-time work, even for equivalent roles. This is the part-time penalty, and it remains one of the largest structural drivers of pay inequality in the UK. It is closely tied to the motherhood penalty: women's earnings drop sharply after having children and rarely recover to pre-birth levels, while men's earnings are largely unaffected. Research from the Institute for Fiscal Studies shows that by the time a first child reaches age 20, women earn roughly 30% less per hour than similarly-qualified men who became fathers at the same time.
            </p>
            <p>
              Sector segregation compounds the picture. Women are concentrated in lower-paying sectors — care, retail, education — while construction and finance, where pay is highest, remain overwhelmingly male. Even within the same sectors, women are under-represented at senior levels. The progression gap means that equal starting salaries diverge sharply by mid-career. Since 2017, employers with 250 or more staff have been required to publish their gender pay gap annually. This mandatory reporting regime — the first of its kind in the UK — has brought unprecedented transparency. In the first year, 78% of reporting employers paid men more than women. Seven years on, the figures have shifted only modestly: the majority of large employers still report a gap, though the average gap has narrowed. The visibility itself matters — companies now face public scrutiny, media comparison tables, and employee pressure. There is evidence that reporting has accelerated action plans, particularly in financial services and professional services firms.
            </p>
            <p>
              What the data does not show is equally important. The UK has no mandatory ethnicity pay gap reporting. Black, Bangladeshi, and Pakistani women face significantly wider pay gaps than white women, but without systematic data collection, these disparities remain largely invisible at employer level. Voluntary reporting uptake remains low. Meanwhile, the age breakdown reveals a striking pattern: among workers under 30, the gender pay gap is near zero or slightly favours women. The gap opens dramatically from the mid-30s onwards — precisely when caring responsibilities begin. This is not a pipeline problem being solved by generational change. It is a structural penalty applied to women who become mothers, and it has barely shifted in two decades. At the current rate of decline, the full-time gender pay gap will not reach zero until the mid-2060s. The all-employees gap, which better captures the lived reality of women's earnings, would take even longer.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-overall', label: 'Overall gap' },
          { id: 'sec-age', label: 'By age group' },
          { id: 'sec-sector', label: 'By sector' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Full-time gender pay gap"
            value="6.9%"
            unit="median, 2024"
            direction="down"
            polarity="up-is-bad"
            changeText={`${fullTimeChange} pp from 2023 · down from 17.4% in 1997`}
            sparklineData={
              data ? sparkFrom(data.overallGap.map(d => d.fullTimePct)) : []
            }
            source="ONS · ASHE, 2024"
            href="#sec-overall"
          />
          <MetricCard
            label="All employees gender pay gap"
            value="13.1%"
            unit="median, 2024"
            direction="down"
            polarity="up-is-bad"
            changeText={`${allEmployeesChange} pp from 2023 · includes part-time penalty`}
            sparklineData={
              data ? sparkFrom(data.overallGap.map(d => d.allEmployeesPct)) : []
            }
            source="ONS · ASHE, 2024"
            href="#sec-age"
          />
          <MetricCard
            label="Years to close at current pace"
            value="40+"
            unit="projected"
            direction="flat"
            polarity="up-is-bad"
            changeText="Based on rate of decline since 2017 · full-time median"
            sparklineData={[]}
            source="ONS · ASHE trend analysis"
            href="#sec-sector"
          />
        </div>

        {/* Chart 1: Overall gender pay gap 1997–2024 */}
        <ScrollReveal>
          <div id="sec-overall" className="mb-12">
            <LineChart
              series={overallGapSeries}
              title="Gender pay gap, UK, 1997–2024"
              subtitle="Median hourly pay gap between men and women. Full-time only vs all employees including part-time."
              yLabel="Pay gap (%)"
              source={{
                name: 'ONS',
                dataset: 'Annual Survey of Hours and Earnings (ASHE)',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Gap by age group 2015–2024 */}
        <ScrollReveal>
          <div id="sec-age" className="mb-12">
            <LineChart
              series={ageGroupSeries}
              title="Gender pay gap by age group, full-time employees, 2015–2024"
              subtitle="Near zero for under-30s, widening sharply from mid-30s as caring responsibilities begin."
              yLabel="Pay gap (%)"
              source={{
                name: 'ONS',
                dataset: 'ASHE — Age group breakdown',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Gap by sector 2017–2024 */}
        <ScrollReveal>
          <div id="sec-sector" className="mb-12">
            <LineChart
              series={sectorSeries}
              title="Gender pay gap by sector, 2017–2024"
              subtitle="Construction and finance lead; retail and hospitality have the narrowest gaps. All sectors narrowing slowly."
              yLabel="Pay gap (%)"
              source={{
                name: 'Gov.uk',
                dataset: 'Gender Pay Gap Service — employer reports',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Mandatory reporting driving transparency since 2017"
            value="~11,000 employers"
            description="Since April 2017, all UK employers with 250 or more staff have been required to publish their gender pay gap annually. Around 11,000 organisations now report each year, covering millions of employees. The regime has brought unprecedented visibility: published figures are freely searchable, enabling employees, investors, and the public to compare employers directly. Research from the London School of Economics found that mandatory reporting led to a modest narrowing of pay gaps, driven primarily by slower wage growth for men in high-gap firms rather than faster wage growth for women. The gap is narrowing — slowly — but the direction of travel is clear, and transparency is the mechanism."
            source="Source: Gov.uk Gender Pay Gap Service. ONS — Annual Survey of Hours and Earnings (ASHE), 2024."
          />
        </ScrollReveal>
        <RelatedTopics />
      </main>
    </>
  );
}

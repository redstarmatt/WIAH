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

interface ChildrenInCarePoint {
  year: number;
  count: number;
}

interface FosterCarersPoint {
  year: number;
  count: number;
}

interface PlacementCostPoint {
  year: number;
  laWeeklyCost: number;
  privateWeeklyCost: number;
}

interface FosterCareData {
  childrenInCare: ChildrenInCarePoint[];
  fosterCarers: FosterCarersPoint[];
  placementCosts: PlacementCostPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FosterCareSystemCrisisPage() {
  const [data, setData] = useState<FosterCareData | null>(null);

  useEffect(() => {
    fetch('/data/foster-care-system-crisis/foster_care_system_crisis.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const childrenInCareSeries: Series[] = data
    ? [{
        id: 'children-in-care',
        label: 'Children looked after',
        colour: '#E63946',
        data: data.childrenInCare.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const fosterCarersSeries: Series[] = data
    ? [{
        id: 'foster-carers',
        label: 'Approved foster carers',
        colour: '#264653',
        data: data.fosterCarers.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const placementCostSeries: Series[] = data
    ? [
        {
          id: 'la-cost',
          label: 'Local authority (weekly)',
          colour: '#2A9D8F',
          data: data.placementCosts.map(d => ({
            date: yearToDate(d.year),
            value: d.laWeeklyCost,
          })),
        },
        {
          id: 'private-cost',
          label: 'Private agency (weekly)',
          colour: '#E63946',
          data: data.placementCosts.map(d => ({
            date: yearToDate(d.year),
            value: d.privateWeeklyCost,
          })),
        },
      ]
    : [];

  const latestChildren = data?.childrenInCare[data.childrenInCare.length - 1];
  const earliestChildren = data?.childrenInCare[0];
  const latestCarers = data?.fosterCarers[data.fosterCarers.length - 1];
  const peakCarers = data?.fosterCarers.reduce((a, b) => a.count > b.count ? a : b);
  const latestCosts = data?.placementCosts[data.placementCosts.length - 1];

  const carerDecline = latestCarers && peakCarers
    ? Math.round(((peakCarers.count - latestCarers.count) / peakCarers.count) * 100)
    : 12;

  const childrenRise = latestChildren && earliestChildren
    ? Math.round(((latestChildren.count - earliestChildren.count) / earliestChildren.count) * 100)
    : 27;

  return (
    <>
      <TopicNav topic="Children & Families" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Children & Families"
          question="Is the foster care system collapsing?"
          finding="England's care system is caught in a structural crisis: the number of children needing placements has risen 27% since 2010 while the pool of foster carers has shrunk 12% since its 2017 peak. The gap is filled by private agencies charging up to five times more than local authority placements."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              There are now 81,770 children in local authority care in England, the highest sustained level since records began. The figure has risen almost every year since 2010, driven by a combination of rising child poverty, cuts to early-help and family support services, and a system that intervenes late rather than early. Meanwhile, the people who look after these children are disappearing. The number of approved foster carers peaked at around 49,700 in 2017 and has fallen steadily since, dropping 12% to approximately 42,070 in 2024. The Fostering Network estimates England is short of at least 5,900 foster families at any given time. Approved foster placements are running at roughly 60% occupancy, not because carers are plentiful but because many are approved only for specific age groups or needs that do not match the children waiting.
            </p>
            <p>
              The consequences of this mismatch are felt most sharply in cost and stability. When a local authority cannot find a foster placement through its own network, it turns to independent fostering agencies, where weekly fees now average over five thousand pounds, compared to around eight hundred pounds for an in-house placement. The Competition and Markets Authority found in 2022 that the largest private providers were making profit margins of 19-23%, extracting value from a system that has no alternative but to pay. Some councils now spend more than half their children's services budget on placements alone, crowding out the preventive work that might reduce the number of children entering care in the first place. At the extreme end, unregulated placements, settings not inspected by Ofsted, are used for some of the most vulnerable teenagers, often in unsuitable accommodation with minimal support.
            </p>
            <p>
              The age profile of foster carers compounds the crisis. More than half of all foster carers are over 55, and many are approaching retirement with no younger cohort replacing them. Recruitment has struggled for years: the role is demanding, the financial support often inadequate, and the bureaucratic burden is heavy. Many carers leave within their first three years. For the children, this means placement instability: roughly one in ten looked-after children experiences three or more placement moves in a single year, each disruption compounding trauma and damaging educational outcomes. Care leavers face some of the worst outcomes of any group in the country. By age 21, 39% of care leavers are not in education, employment, or training, compared to 12% of all young people. They are dramatically overrepresented in the homeless population and the prison system. The foster care crisis is not a future risk; it is a present emergency producing measurable harm to the most vulnerable children in the country.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-children', label: 'Children in care' },
          { id: 'sec-carers', label: 'Foster carers' },
          { id: 'sec-costs', label: 'Placement costs' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Children in care"
            value={latestChildren ? latestChildren.count.toLocaleString() : '81,770'}
            unit="2023/24"
            direction="up"
            polarity="up-is-bad"
            changeText={`Up ${childrenRise}% since 2010 · highest sustained level on record`}
            sparklineData={
              data ? sparkFrom(data.childrenInCare.map(d => d.count)) : []
            }
            source="DfE · Children looked after in England, 2023/24"
            href="#sec-children"
          />
          <MetricCard
            label="Foster carers decline"
            value={`${carerDecline}%`}
            unit="since 2017 peak"
            direction="down"
            polarity="up-is-good"
            changeText={
              latestCarers && peakCarers
                ? `From ${peakCarers.count.toLocaleString()} to ${latestCarers.count.toLocaleString()} · 5,900 families short`
                : 'From 49,700 to 42,070 · 5,900 families short'
            }
            sparklineData={
              data ? sparkFrom(data.fosterCarers.map(d => d.count)) : []
            }
            source="Fostering Network · Foster Care Statistics, 2024"
            href="#sec-carers"
          />
          <MetricCard
            label="Approved places filled"
            value="60%"
            unit="occupancy rate"
            direction="down"
            polarity="up-is-good"
            changeText="Mismatch between available carers and children's needs profiles"
            sparklineData={[72, 70, 68, 66, 65, 63, 62, 61, 60, 60]}
            source="DfE · Fostering in England, 2023/24"
            href="#sec-costs"
          />
        </div>

        {/* Chart 1: Children in care */}
        <ScrollReveal>
          <div id="sec-children" className="mb-12">
            <LineChart
              series={childrenInCareSeries}
              title="Children looked after by local authorities, England, 2010–2024"
              subtitle="Total children in care at 31 March each year. Sustained rise over 14 years driven by rising demand and reduced early-help services."
              yLabel="Children"
              source={{
                name: 'Department for Education',
                dataset: 'Children looked after in England',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Foster carer numbers */}
        <ScrollReveal>
          <div id="sec-carers" className="mb-12">
            <LineChart
              series={fosterCarersSeries}
              title="Approved foster carer households, England, 2010–2024"
              subtitle="Foster carer numbers peaked in 2017 and have declined steadily since. More than half of current carers are over 55."
              yLabel="Foster carers"
              source={{
                name: 'Fostering Network / DfE',
                dataset: 'Fostering in England',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Placement costs — LA vs Private */}
        <ScrollReveal>
          <div id="sec-costs" className="mb-12">
            <LineChart
              series={placementCostSeries}
              title="Weekly foster placement costs: local authority vs private agency, 2015–2024"
              subtitle="Private agency placements now cost over six times more than in-house local authority placements. The gap has widened every year."
              yLabel="Weekly cost (£)"
              source={{
                name: 'Competition and Markets Authority / DfE',
                dataset: "Children's social care market study",
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Mockingbird model and Staying Put showing promise"
            value="Staying Put to 25"
            description="The Mockingbird Family Model, developed in the US and now piloted across 40 local authorities in England, organises foster carers into supportive 'constellations' around an experienced hub carer. Early evaluations show improved placement stability, reduced carer burnout, and better outcomes for children. Separately, the Staying Put policy now allows care leavers to remain with their foster families until age 25 rather than being discharged at 18. Take-up has grown each year since its introduction, and care leavers who stay put are significantly more likely to be in education, employment, or training at 21. These models demonstrate that structural reform, not just increased spending, can make a measurable difference to the most vulnerable young people in the system."
            source="Source: DfE — Mockingbird programme evaluation, 2023. DfE — Staying Put guidance and outcomes data, 2024. Fostering Network — State of the Nation's Foster Care, 2024."
          />
        </ScrollReveal>

        <RelatedTopics />
      </main>
    </>
  );
}

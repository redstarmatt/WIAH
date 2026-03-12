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

interface AdoptionOrderPoint {
  year: number;
  orders: number;
}

interface WaitDaysPoint {
  year: number;
  days: number;
}

interface WaitingVsApprovedPoint {
  year: number;
  childrenWaiting: number;
  approvedAdopters: number;
}

interface AdoptionData {
  adoptionOrders: AdoptionOrderPoint[];
  averageWaitDays: WaitDaysPoint[];
  waitingVsApproved: WaitingVsApprovedPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AdoptionPage() {
  const [data, setData] = useState<AdoptionData | null>(null);

  useEffect(() => {
    fetch('/data/adoption/adoption.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const ordersSeries: Series[] = data
    ? [{
        id: 'adoption-orders',
        label: 'Adoption orders (England)',
        colour: '#2A9D8F',
        data: data.adoptionOrders.map(d => ({
          date: yearToDate(d.year),
          value: d.orders,
        })),
      }]
    : [];

  const waitDaysSeries: Series[] = data
    ? [{
        id: 'wait-days',
        label: 'Average days (care to adoption)',
        colour: '#E63946',
        data: data.averageWaitDays.map(d => ({
          date: yearToDate(d.year),
          value: d.days,
        })),
      }]
    : [];

  const waitingVsApprovedSeries: Series[] = data
    ? [
        {
          id: 'children-waiting',
          label: 'Children waiting',
          colour: '#E63946',
          data: data.waitingVsApproved.map(d => ({
            date: yearToDate(d.year),
            value: d.childrenWaiting,
          })),
        },
        {
          id: 'approved-adopters',
          label: 'Approved adopters',
          colour: '#2A9D8F',
          data: data.waitingVsApproved.map(d => ({
            date: yearToDate(d.year),
            value: d.approvedAdopters,
          })),
        },
      ]
    : [];

  const latestOrders = data?.adoptionOrders[data.adoptionOrders.length - 1];
  const peakOrders = data?.adoptionOrders.reduce((a, b) => a.orders > b.orders ? a : b);
  const latestWait = data?.averageWaitDays[data.averageWaitDays.length - 1];
  const latestWaiting = data?.waitingVsApproved[data.waitingVsApproved.length - 1];

  const ordersDrop = latestOrders && peakOrders
    ? Math.round(((peakOrders.orders - latestOrders.orders) / peakOrders.orders) * 100)
    : 45;

  return (
    <>
      <TopicNav topic="Care & Support" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Care & Support"
          question="Are children actually being adopted?"
          finding="Adoption orders in England have fallen 45% from their 2015 peak of 5,360 to just 2,950 in 2024. Children wait an average of 538 days from entering care to being placed with an adoptive family — well above the 426-day target. The gap between children waiting and approved adopters continues to widen."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The story of adoption in England is fundamentally shaped by a single court ruling. In September 2013, the Court of Appeal handed down Re B-S (Children), which required courts to consider adoption only when &ldquo;nothing else will do&rdquo; and to carry out a proper analysis of all realistic options for a child&rsquo;s future. The ruling was a necessary corrective — there were legitimate concerns that adoption was being pursued too readily without exhausting alternatives — but its effect on the system was seismic. Local authorities became markedly more cautious about applying for placement orders. The number granted fell from over 6,200 in 2013/14 to under 3,300 by 2017/18. The judiciary intended proportionality; the system&rsquo;s response was widespread retreat. By 2021, annual adoption orders had dropped below 2,900, and the decline has stabilised around 2,950 — less than half the 2015 peak.
            </p>
            <p>
              The adopter pipeline has contracted in parallel. The number of approved adopters fell from over 4,400 in 2014 to around 2,340 in 2024, while the number of children with a placement order waiting for a match has risen past 3,300. The hardest-to-place children wait longest: sibling groups of three or more, children over five, those with foetal alcohol spectrum disorder or attachment trauma, and children from Black, Asian, and minority ethnic backgrounds. Historic policies requiring ethnic matching — formally relaxed by the Children and Families Act 2014 — left a cultural residue in social work practice that has been slow to dissipate. Inter-country adoption, once a meaningful route for around 300 children per year, has declined to fewer than 30 annually, reflecting both tighter Hague Convention regulation and reduced interest from prospective adopters who find the process prohibitively long and uncertain. Fostering-to-adopt (early permanence placement) remains underused despite strong evidence that it reduces disruption for children, partly because of inconsistent local authority practice and resistance from some birth family representatives during care proceedings.
            </p>
            <p>
              Special guardianship orders have grown significantly as an alternative permanence route, rising from around 2,000 per year in 2010 to over 4,500 by 2024. SGOs keep children within their extended family network — typically with grandparents, aunts, or uncles — but often come with far less post-order support than adoption. Many special guardians are older, on lower incomes, and receive no therapeutic support for children who have experienced neglect or abuse. The Adoption Support Fund, introduced in 2015, has provided therapeutic interventions for over 50,000 adopted children and their families, addressing attachment difficulties, trauma, and developmental delay — but it is capped at &pound;5,000 per child per year (or &pound;2,500 for assessments) and faces annual funding uncertainty that makes long-term therapeutic planning difficult. The system faces a fundamental tension: the courts demand exhaustive exploration of alternatives before adoption, while children who need adoptive families wait longer and grow older — becoming, in the system&rsquo;s own cruel logic, progressively harder to place with each passing month.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-orders', label: 'Adoption orders' },
          { id: 'sec-wait', label: 'Wait times' },
          { id: 'sec-gap', label: 'Supply gap' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Adoption orders (England)"
            value={latestOrders ? latestOrders.orders.toLocaleString() : '2,950'}
            unit="2023/24"
            direction="down"
            polarity="up-is-good"
            changeText={`Down ${ordersDrop}% from ${peakOrders ? peakOrders.orders.toLocaleString() : '5,360'} peak in ${peakOrders ? peakOrders.year : 2015}`}
            sparklineData={
              data ? sparkFrom(data.adoptionOrders.map(d => d.orders)) : []
            }
            source="DfE · SSDA903 Children Looked After Statistics, 2023/24"
            href="#sec-orders"
          />
          <MetricCard
            label="Average wait (care to adoption)"
            value={latestWait ? latestWait.days.toLocaleString() : '538'}
            unit="days · 2023/24"
            direction="up"
            polarity="up-is-bad"
            changeText="Target: 426 days · 112 days above target"
            sparklineData={
              data ? sparkFrom(data.averageWaitDays.map(d => d.days)) : []
            }
            source="DfE · SSDA903 Children Looked After Statistics, 2023/24"
            href="#sec-wait"
          />
          <MetricCard
            label="Children waiting vs approved adopters"
            value={latestWaiting ? `${latestWaiting.childrenWaiting.toLocaleString()} vs ${latestWaiting.approvedAdopters.toLocaleString()}` : '3,310 vs 2,340'}
            unit="2023/24"
            direction="up"
            polarity="up-is-bad"
            changeText="970 more children waiting than adopters approved"
            sparklineData={
              data ? sparkFrom(data.waitingVsApproved.map(d => d.childrenWaiting - d.approvedAdopters)) : []
            }
            source="Adoption & Special Guardianship Leadership Board, 2023/24"
            href="#sec-gap"
          />
        </div>

        {/* Chart 1: Adoption orders */}
        <ScrollReveal>
          <div id="sec-orders" className="mb-12">
            <LineChart
              series={ordersSeries}
              title="Adoption orders granted, England, 2010–2024"
              subtitle="Annual adoption orders. Rose sharply under coalition government reforms, peaked at 5,360 in 2015, then fell after Re B-S ruling took effect."
              yLabel="Orders"
              source={{
                name: 'DfE',
                dataset: 'SSDA903 Children Looked After in England',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Average wait days */}
        <ScrollReveal>
          <div id="sec-wait" className="mb-12">
            <LineChart
              series={waitDaysSeries}
              title="Average time from entering care to adoption placement, 2010–2024"
              subtitle="Days from child entering care to being placed with adoptive family. Government target is 426 days."
              yLabel="Days"
              source={{
                name: 'DfE',
                dataset: 'SSDA903 Children Looked After in England',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Children waiting vs approved adopters */}
        <ScrollReveal>
          <div id="sec-gap" className="mb-12">
            <LineChart
              series={waitingVsApprovedSeries}
              title="Children waiting for adoption vs approved adopters, 2014–2024"
              subtitle="The gap has reversed: more children now wait than there are approved families available to adopt them."
              yLabel="Count"
              source={{
                name: 'Adoption & Special Guardianship Leadership Board',
                dataset: 'Annual Report — Adopter Recruitment and Matching',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Regional Adoption Agencies improving recruitment and matching"
            value="30 RAAs"
            description="The regionalisation of adoption services — consolidating around 150 local authority adoption teams into 30 Regional Adoption Agencies by 2021 — has improved adopter recruitment, reduced duplication, and enabled better matching across local authority boundaries. Early evidence suggests RAAs are reducing the time children wait for a match, particularly for those with straightforward profiles. The Adoption Support Fund, launched in 2015, has funded therapeutic support for over 50,000 adopted children and their families, addressing attachment difficulties, trauma, and developmental delay. While challenges remain for harder-to-place children, the structural reform represents the most significant positive change in the adoption system in a decade."
            source="Source: DfE — Regional Adoption Agency Programme Evaluation, 2023. Adoption Support Fund Annual Report, CoramBAAF."
          />
        </ScrollReveal>
        <RelatedTopics />
      </main>
    </>
  );
}

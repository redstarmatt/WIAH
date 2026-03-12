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

interface PerformanceQuarter {
  quarter: string;
  pctNextDay: number;
}

interface VolumeYear {
  year: number;
  lettersBillions: number;
  parcelsMillions: number;
}

interface DeliveryOfficeYear {
  year: number;
  count: number;
}

interface PostalServiceData {
  national: {
    firstClassPerformance: PerformanceQuarter[];
    volumes: VolumeYear[];
    deliveryOffices: DeliveryOfficeYear[];
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function quarterToDate(q: string): Date {
  const [yearStr, qStr] = q.split('-');
  const year = parseInt(yearStr);
  const quarter = parseInt(qStr.replace('Q', ''));
  const month = (quarter - 1) * 3;
  return new Date(year, month, 15);
}

function yearToDate(y: number): Date {
  return new Date(y, 6, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PostalServicePage() {
  const [data, setData] = useState<PostalServiceData | null>(null);

  useEffect(() => {
    fetch('/data/postal-service/postal_service.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Chart series ─────────────────────────────────────────────────────────

  const performanceSeries: Series[] = data
    ? [{
        id: 'first-class',
        label: 'First-class next-day delivery rate',
        colour: '#E63946',
        data: data.national.firstClassPerformance.map(d => ({
          date: quarterToDate(d.quarter),
          value: d.pctNextDay,
        })),
      }]
    : [];

  const performanceAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 15), label: 'Covid-19 pandemic' },
    { date: new Date(2022, 7, 15), label: 'CWU strikes — 18 days' },
    { date: new Date(2024, 9, 15), label: 'IDS/Kretinsky takeover' },
  ];

  const performanceTargetLine = { value: 93, label: 'Target: 93%' };

  const letterSeries: Series[] = data
    ? [{
        id: 'letters',
        label: 'Letter volumes (billions)',
        colour: '#E63946',
        data: data.national.volumes.map(d => ({
          date: yearToDate(d.year),
          value: d.lettersBillions,
        })),
      }]
    : [];

  const parcelSeries: Series[] = data
    ? [{
        id: 'parcels',
        label: 'Parcel volumes (millions)',
        colour: '#264653',
        data: data.national.volumes.map(d => ({
          date: yearToDate(d.year),
          value: d.parcelsMillions,
        })),
      }]
    : [];

  const deliveryOfficeSeries: Series[] = data
    ? [{
        id: 'offices',
        label: 'Delivery offices',
        colour: '#6B7280',
        data: data.national.deliveryOffices.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Postal Service" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Postal Service"
          question="Does the Post Actually Arrive?"
          finding="Royal Mail has missed its first-class delivery target every quarter since 2022. The 93% next-day standard is now a fiction — actual performance hovers around 84–85%, while letter volumes have collapsed by 60% since their 2010 peak."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Royal Mail&apos;s Universal Service Obligation requires it to deliver letters six days a week and parcels five days a week to every address in the UK — roughly 32 million delivery points. It is a commitment that dates back centuries and underpins the country&apos;s basic infrastructure. But the economics of that obligation have deteriorated sharply. Letter volumes peaked at 15.1 billion items in 2010 and have since fallen to around 5.9 billion, a decline of more than 60% driven by the shift to email, digital billing, and online communication. Parcel volumes have grown by about 50% over the same period, boosted by e-commerce, but Royal Mail faces fierce competition from Amazon Logistics, DPD, Evri, and other carriers who cherry-pick profitable urban routes. The result: Royal Mail delivers roughly 75,000 fewer items per day than a decade ago, with a workforce that has shrunk from 160,000 to around 115,000 employees. Ofcom fined the company &pound;5.6 million in 2023 for persistently missing its quality-of-service targets — the first-class next-day delivery rate, which should be 93%, has hovered around 84&ndash;85%, while the second-class three-day target of 98.5% has been missed every quarter since 2022.
            </p>
            <p>
              The ownership question now looms over every strategic decision. The takeover by Czech billionaire Daniel K&rcaron;et&iacute;nsk&yacute;&apos;s EP Group, completed in 2024 through International Distributions Services, has raised concerns about whether the new owners will invest in automation and modernisation or prioritise extraction. Royal Mail&apos;s six-day letter delivery obligation is formally under review by Ofcom, with proposals on the table to reduce it to five days or even three — a change that would disproportionately affect rural communities, elderly residents, and small businesses that still depend on physical mail. Meanwhile, delivery office closures are accelerating: the network has shrunk from over 1,200 offices in 2015 to around 1,008 in 2025, with consolidations concentrating sorting capacity in larger regional hubs and lengthening last-mile routes in rural areas. The 18 days of CWU strike action in late 2022 disrupted Christmas deliveries and exposed the fragility of a service stretched between declining revenues, regulatory obligations, and workforce pressures. Whether the universal service can survive in its current form — or whether the UK is heading toward a two-tier postal system where cities get daily delivery and rural areas get something less — is the central question facing the postal service today.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-performance', label: 'Delivery Performance' },
          { id: 'sec-volumes', label: 'Letter & Parcel Volumes' },
          { id: 'sec-offices', label: 'Delivery Offices' },
          { id: 'sec-positive', label: 'What\'s Working' },
        ]} />

        {/* ── Metric Cards ────────────────────────────────────────────────── */}

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="1st class next-day delivery"
              value="84"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="Target: 93%. Missed every quarter since 2022"
              sparklineData={[93.1, 92.8, 92.3, 91.5, 90.8, 89.0, 87.2, 86.2, 84.7, 84.9, 84.6]}
              source="Ofcom Quality of Service Report, 2025"
              href="#sec-performance"
            />
            <MetricCard
              label="Letter volumes vs 2010 peak"
              value="-61"
              unit="%"
              direction="down"
              polarity="neutral"
              changeText="5.9bn letters in 2025, down from 15.1bn in 2010"
              sparklineData={[15.1, 14.2, 13.3, 12.6, 12.0, 11.4, 10.8, 10.1, 9.5, 9.0, 7.4, 7.1, 6.8, 6.4, 6.1, 5.9]}
              source="Ofcom Annual Monitoring Report, 2025"
              href="#sec-volumes"
            />
            <MetricCard
              label="Royal Mail fines"
              value="£5.6"
              unit="m"
              direction="up"
              polarity="up-is-bad"
              changeText="Ofcom fine in 2023 for missing delivery targets"
              sparklineData={[0, 0, 0, 0, 0, 0, 0, 0, 5.6]}
              source="Ofcom enforcement action, 2023"
              href="#sec-performance"
            />
          </div>
        </ScrollReveal>

        {/* ── Chart 1: First-class delivery performance ────────────────── */}

        <ScrollReveal>
          <section id="sec-performance" className="mb-12">
            <LineChart
              title="First-class delivery performance, 2015–2025"
              subtitle="Percentage of first-class letters delivered next working day. Ofcom quarterly quality of service data."
              series={performanceSeries}
              annotations={performanceAnnotations}
              targetLine={performanceTargetLine}
              yLabel="% next-day delivery"
            />
          </section>
        </ScrollReveal>

        {/* ── Chart 2: Letter vs parcel volumes ────────────────────────── */}

        <ScrollReveal>
          <section id="sec-volumes" className="mb-12">
            <LineChart
              title="Letter volumes, 2010–2025"
              subtitle="Annual addressed letter volumes in billions. Letters have declined by over 60% from their 2010 peak."
              series={letterSeries}
              yLabel="Billions"
            />

            <div className="mt-8">
              <LineChart
                title="Parcel volumes, 2010–2025"
                subtitle="Annual parcel volumes in millions. E-commerce drove growth, but pandemic-era peaks have eased."
                series={parcelSeries}
                yLabel="Millions"
              />
            </div>
          </section>
        </ScrollReveal>

        {/* ── Chart 3: Delivery offices ────────────────────────────────── */}

        <ScrollReveal>
          <section id="sec-offices" className="mb-12">
            <LineChart
              title="Royal Mail delivery offices, 2015–2025"
              subtitle="Number of sorting and delivery offices across the UK. Consolidation into regional hubs is accelerating."
              series={deliveryOfficeSeries}
              yLabel="Offices"
            />
          </section>
        </ScrollReveal>

        {/* ── Positive callout ─────────────────────────────────────────── */}

        <ScrollReveal>
          <section id="sec-positive">
            <PositiveCallout
              title="What's working"
              value="98%+"
              description="Parcel delivery is faster and cheaper than ever. Royal Mail's tracked 24/48 services achieve 98%+ on-time delivery. Competition from multiple carriers has driven innovation and reduced parcel costs by 15% in real terms since 2018."
              source="Ofcom Annual Monitoring Report on the Postal Market, 2025"
            />
          </section>
        </ScrollReveal>

        <RelatedTopics />
      </main>
    </>
  );
}

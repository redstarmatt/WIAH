'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface RiverEcologicalPoint {
  year: number;
  goodOrAbove: number;
}

interface BathingWaterPoint {
  year: number;
  excellent: number;
  good: number;
  sufficient: number;
  poor: number;
}

interface DesignatedSitePoint {
  year: number;
  riverSites: number;
}

interface RiverBathingData {
  riverEcologicalStatus: RiverEcologicalPoint[];
  bathingWaterQuality: BathingWaterPoint[];
  designatedSites: DesignatedSitePoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function RiverBathingPage() {
  const [data, setData] = useState<RiverBathingData | null>(null);

  useEffect(() => {
    fetch('/data/river-bathing/river_bathing.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const ecologicalSeries: Series[] = data
    ? [{
        id: 'ecological-status',
        label: 'Rivers in good or better ecological status (%)',
        colour: '#264653',
        data: data.riverEcologicalStatus.map(d => ({
          date: yearToDate(d.year),
          value: d.goodOrAbove,
        })),
      }]
    : [];

  const latestEcological = data?.riverEcologicalStatus[data.riverEcologicalStatus.length - 1];
  const latestBathing = data?.bathingWaterQuality[data.bathingWaterQuality.length - 1];
  const latestSites = data?.designatedSites[data.designatedSites.length - 1];

  return (
    <>
      <TopicNav topic="Environment & Climate" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="River Bathing Water Quality"
          question="Is it safe to swim in England's rivers?"
          finding="Only 14% of English rivers are in good ecological status — and the UK has missed every water quality improvement target since 2004. Just 35% of monitored river bathing sites received 'excellent' ratings in 2023."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England entered the EU Water Framework Directive in 2000 with a commitment to get 60% of rivers to good ecological status by 2015. By 2022 the figure stood at 14%, and the Environment Agency&apos;s own modelling suggests England will not reach 60% in the foreseeable future. The causes are well-understood: water companies recorded 3.6 million hours of sewage overflow in 2022; agricultural run-off contributes severe phosphate and nitrate pollution (the River Wye is now covered in algae for much of the summer from intensive chicken farming upstream); and abstraction leaves some chalk streams &mdash; globally rare habitats &mdash; dry in summer. Designated river bathing sites grew from 8 in 2015 to 70 by 2023, creating monitoring accountability where none previously existed, but many sites still fail good or excellent standards. Environment Agency enforcement capacity has been reduced by budget cuts over the same period that water quality has deteriorated.</p>
            <p>The communities most affected are those who rely on rivers and coastal water for recreation and wellbeing &mdash; a constituency that has widened rapidly as open-water swimming grew into a mass participation activity. Bathing water failures fall disproportionately on communities near combined sewer outfalls and intensive agriculture, and the people least able to travel to safer sites have fewest alternatives. Ofwat&apos;s fines on water companies have been too small to change behaviour, and the regulator has been slow to act on clear violations &mdash; meaning the cost of decades of underinvestment in infrastructure is paid by river users, not shareholders.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-ecological', label: 'Ecological status' },
          { id: 'sec-bathing', label: 'Bathing water quality' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Rivers in good ecological status"
              value={latestEcological ? latestEcological.goodOrAbove.toString() : '14'}
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="Target was 60% by 2015 · EA has missed every deadline"
              sparklineData={[25.5, 17.3, 15.7, 14.1, 14.0]}
              source="Environment Agency · 2022"
              href="#sec-overview"/>
            <MetricCard
              label="River bathing sites classified 'poor'"
              value={latestBathing ? latestBathing.poor.toString() : '24'}
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="Worsening in 2023 · E. coli and sewage discharge failing sites"
              sparklineData={[23, 22, 22, 21, 22, 24]}
              source="EA Bathing Water Quality · 2023"
              href="#sec-ecological"/>
            <MetricCard
              label="Designated river bathing sites"
              value={latestSites ? latestSites.riverSites.toString() : '70'}
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from just 8 in 2015 · Dartmouth, River Wharfe, Derwent"
              sparklineData={[8, 15, 42, 70]}
              source="Environment Agency · 2023"
              href="#sec-bathing"/>
          </div>
        </ScrollReveal>

        {/* Chart: ecological status */}
        <ScrollReveal>
          <div id="sec-ecological" className="mb-12">
            <LineChart
              series={ecologicalSeries}
              title="English rivers in good or better ecological status, 2009–2022"
              subtitle="The EU Water Framework Directive target was 60% by 2015. The UK has never reached half that figure."
              yLabel="% of rivers"
              source={{
                name: 'Environment Agency',
                dataset: 'River basin management plans',
                frequency: 'periodic',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Bathing water quality stacked */}
        <ScrollReveal>
          <div id="sec-bathing" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-1">
                Bathing water quality at designated river sites, 2018–2023
              </h2>
              <p className="text-sm text-wiah-mid mb-6">Proportion classified excellent, good, sufficient, and poor. Poor sites are failing EU-derived standards.</p>
              <div className="space-y-4 mt-4">
                {data?.bathingWaterQuality.map((y) => (
                  <div key={y.year}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-wiah-black">{y.year}</span>
                      <div className="flex gap-3 font-mono text-xs text-wiah-mid">
                        <span style={{ color: '#2A9D8F' }}>Excellent: {y.excellent}%</span>
                        <span style={{ color: '#264653' }}>Good: {y.good}%</span>
                        <span style={{ color: '#F4A261' }}>Sufficient: {y.sufficient}%</span>
                        <span style={{ color: '#E63946' }}>Poor: {y.poor}%</span>
                      </div>
                    </div>
                    <div className="h-6 rounded-sm overflow-hidden flex">
                      <div className="h-full" style={{ width: `${y.excellent}%`, backgroundColor: '#2A9D8F' }} />
                      <div className="h-full" style={{ width: `${y.good}%`, backgroundColor: '#264653' }} />
                      <div className="h-full" style={{ width: `${y.sufficient}%`, backgroundColor: '#F4A261' }} />
                      <div className="h-full" style={{ width: `${y.poor}%`, backgroundColor: '#E63946' }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: Environment Agency — Bathing Water Quality · 2023</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Sources */}
        <ScrollReveal>
          <div className="border-t border-wiah-border pt-8 mt-8">
            <h2 className="text-base font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
            <ul className="space-y-2 font-mono text-xs text-wiah-mid">
              <li>
                <a href="https://www.gov.uk/government/organisations/environment-agency" className="underline hover:text-wiah-black" target="_blank" rel="noopener noreferrer">
                  Environment Agency
                </a>
                {' '}— river ecological status classifications and bathing water quality data
              </li>
              <li>
                <a href="https://www.sas.org.uk/water-quality/bathing-water-quality-results/" className="underline hover:text-wiah-black" target="_blank" rel="noopener noreferrer">
                  Surfers Against Sewage
                </a>
                {' '}— bathing water quality reports and sewage alert data
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </main>
    </>
  );
}

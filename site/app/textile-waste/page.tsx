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

interface WastePerPersonPoint {
  year: number;
  kg: number;
}

interface RecyclingRatePoint {
  year: number;
  pct: number;
}

interface DisposalPoint {
  year: number;
  landfillPct: number;
  incinerationPct: number;
  exportPct: number;
}

interface FastFashionPoint {
  year: number;
  billionItems: number;
}

interface TextileWasteData {
  wastePerPerson: WastePerPersonPoint[];
  recyclingRate: RecyclingRatePoint[];
  landfillVsIncineration: DisposalPoint[];
  fastFashionItems: FastFashionPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function TextileWastePage() {
  const [data, setData] = useState<TextileWasteData | null>(null);

  useEffect(() => {
    fetch('/data/textile-waste/textile_waste.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const wastePerPersonSeries: Series[] = data
    ? [{
        id: 'waste-per-person',
        label: 'Textile waste per person (kg/year)',
        colour: '#E63946',
        data: data.wastePerPerson.map(d => ({
          date: yearToDate(d.year),
          value: d.kg,
        })),
      }]
    : [];

  const recyclingRateSeries: Series[] = data
    ? [{
        id: 'recycling-rate',
        label: 'Clothing recycled or donated (%)',
        colour: '#264653',
        data: data.recyclingRate.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const disposalSeries: Series[] = data
    ? [
        {
          id: 'landfill',
          label: 'Landfill (%)',
          colour: '#E63946',
          data: data.landfillVsIncineration.map(d => ({
            date: yearToDate(d.year),
            value: d.landfillPct,
          })),
        },
        {
          id: 'incineration',
          label: 'Incineration (%)',
          colour: '#F4A261',
          data: data.landfillVsIncineration.map(d => ({
            date: yearToDate(d.year),
            value: d.incinerationPct,
          })),
        },
        {
          id: 'export',
          label: 'Exported (%)',
          colour: '#6B7280',
          data: data.landfillVsIncineration.map(d => ({
            date: yearToDate(d.year),
            value: d.exportPct,
          })),
        },
      ]
    : [];

  // ── Derived values ────────────────────────────────────────────────────

  const latestWaste = data?.wastePerPerson[data.wastePerPerson.length - 1];
  const earliestWaste = data?.wastePerPerson[0];
  const latestRecycling = data?.recyclingRate[data.recyclingRate.length - 1];
  const peakRecycling = data?.recyclingRate.reduce((a, b) => a.pct > b.pct ? a : b);
  const latestDisposal = data?.landfillVsIncineration[data.landfillVsIncineration.length - 1];
  const latestFashion = data?.fastFashionItems[data.fastFashionItems.length - 1];

  const wasteIncrease = latestWaste && earliestWaste
    ? Math.round(((latestWaste.kg - earliestWaste.kg) / earliestWaste.kg) * 100)
    : 47;

  // ── Annotations ───────────────────────────────────────────────────────

  const wasteAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: Environmental Audit Committee report' },
    { date: new Date(2020, 0, 1), label: '2020: COVID-19 lockdowns' },
  ];

  const recyclingAnnotations: Annotation[] = [
    { date: new Date(2018, 0, 1), label: '2018: China bans textile waste imports' },
  ];

  const disposalAnnotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: '2015: Landfill tax escalator' },
    { date: new Date(2020, 0, 1), label: '2020: Export disruption' },
  ];

  return (
    <>
      <TopicNav topic="Textile Waste" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Textile Waste"
          question="Is Britain's Throwaway Fashion Culture Getting Worse?"
          finding="The UK generates 26.8 kg of textile waste per person per year — the highest rate in Europe. Only 35% of clothing is recycled or donated, down from 48% in 2010, as fast fashion produces garments too poor quality to resell. Meanwhile, incineration has quietly replaced landfill as the primary disposal route."
          colour="#6B7280"
          preposition="with"
        />

        {/* Editorial context */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Britain buys more clothing per person than any other European country — an estimated 3.9 billion
              items in 2024, or roughly 57 garments for every man, woman, and child. The sheer volume has
              overwhelmed the systems designed to handle what gets thrown away. Charity shops, once the backbone
              of textile reuse, report that the quality of donated clothing has fallen so sharply that an
              increasing proportion goes straight to rag merchants or incinerators. The average garment is now
              worn just seven times before being discarded, down from an estimated 20 wears two decades ago.
              WRAP estimates that extending the active life of clothing by just nine months would reduce carbon,
              water, and waste footprints by 20-30%.
            </p>
            <p>
              The disposal picture tells its own story. In 2010, 62% of textile waste went to landfill. By 2024,
              that had fallen to 22% — but not because of recycling. Incineration, euphemistically rebranded as
              &ldquo;energy from waste,&rdquo; now accounts for 52% of textile disposal, up from 18% in 2010. The
              UK exports another 26% — much of it shipped to countries in West Africa and South Asia where it
              overwhelms local markets and, increasingly, ends up in open dumps and waterways. The 2019
              Environmental Audit Committee report &ldquo;Fixing Fashion&rdquo; called the situation &ldquo;a
              social and environmental emergency&rdquo; and recommended an Extended Producer Responsibility scheme
              for textiles. Six years on, the scheme remains under consultation. France introduced one in 2007.
            </p>
            <p>
              The structural driver is economics. A fast fashion garment can retail for less than a sandwich. At
              these prices, clothing becomes disposable by design — the cost of repair or alteration exceeds the
              cost of replacement. Ultra-fast fashion platforms have accelerated the cycle further, with some
              listing 6,000 new items per day. Until the true environmental cost of textile production is
              reflected in the price, the waste mountain will continue to grow. The government&rsquo;s forthcoming
              Extended Producer Responsibility consultation for textiles, expected in 2026, may begin to shift
              the economics — but the gap between Britain and European neighbours that have acted already is
              widening each year.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-waste', label: 'Waste per person' },
          { id: 'sec-recycling', label: 'Recycling rate' },
          { id: 'sec-disposal', label: 'Disposal routes' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Textile waste per person"
            value={latestWaste ? latestWaste.kg.toFixed(1) : '26.8'}
            unit="kg/year"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${wasteIncrease}% since ${earliestWaste?.year ?? 2010} · highest in Europe`}
            sparklineData={
              data ? sparkFrom(data.wastePerPerson.map(d => d.kg)) : [23, 23.5, 24, 24.8, 25.5, 26.2, 26.8]
            }
            source="WRAP — Textiles Market Situation Report, 2024"
            href="#sec-waste"
          />
          <MetricCard
            label="Clothing recycled or donated"
            value={latestRecycling ? String(latestRecycling.pct) : '35'}
            unit="%"
            direction="down"
            polarity="up-is-good"
            changeText={
              latestRecycling && peakRecycling
                ? `Down from ${peakRecycling.pct}% in ${peakRecycling.year} · garment quality too poor to resell`
                : 'down from 48% in 2010'
            }
            sparklineData={
              data ? sparkFrom(data.recyclingRate.map(d => d.pct)) : [42, 42, 41, 39, 37, 36, 35]
            }
            source="WRAP — Textiles Market Situation Report, 2024"
            href="#sec-recycling"
          />
          <MetricCard
            label="Textile waste incinerated"
            value={latestDisposal ? String(latestDisposal.incinerationPct) : '52'}
            unit="%"
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 18% in 2010 · rebranded as 'energy from waste'"
            sparklineData={
              data ? sparkFrom(data.landfillVsIncineration.map(d => d.incinerationPct)) : [32, 34, 37, 40, 44, 46, 48, 50, 52]
            }
            source="Defra — UK Statistics on Waste, 2024"
            href="#sec-disposal"
          />
        </div>

        {/* Chart 1: Waste per person */}
        <ScrollReveal>
          <div id="sec-waste" className="mb-12">
            <LineChart
              series={wastePerPersonSeries}
              annotations={wasteAnnotations}
              title="Textile waste per person, UK, 2010–2024"
              subtitle="Kilograms per person per year. The UK generates more textile waste per capita than any other European country."
              yLabel="kg per person"
              source={{
                name: 'WRAP',
                dataset: 'Textiles Market Situation Report',
                url: 'https://wrap.org.uk/resources/report/textiles-market-situation-report-2024',
                date: 'Feb 2026',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Recycling rate */}
        <ScrollReveal>
          <div id="sec-recycling" className="mb-12">
            <LineChart
              series={recyclingRateSeries}
              annotations={recyclingAnnotations}
              title="Clothing recycled or donated, UK, 2010–2024"
              subtitle="Percentage of discarded textiles that are recycled, donated, or otherwise diverted from disposal. Includes charity shop donations."
              yLabel="% recycled or donated"
              source={{
                name: 'WRAP',
                dataset: 'Textiles Market Situation Report',
                url: 'https://wrap.org.uk/resources/report/textiles-market-situation-report-2024',
                date: 'Feb 2026',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Disposal routes */}
        <ScrollReveal>
          <div id="sec-disposal" className="mb-12">
            <LineChart
              series={disposalSeries}
              annotations={disposalAnnotations}
              title="Textile waste disposal routes, UK, 2010–2024"
              subtitle="How discarded textiles are disposed of. Incineration has replaced landfill as the dominant route."
              yLabel="% of textile waste"
              source={{
                name: 'Defra',
                dataset: 'UK Statistics on Waste',
                url: 'https://www.gov.uk/government/statistics/uk-waste-data',
                date: 'Feb 2026',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="France's Extended Producer Responsibility scheme shows the model works"
            value="€300M+"
            unit="collected annually"
            description="France introduced its Extended Producer Responsibility (EPR) scheme for textiles in 2007 — making fashion brands financially responsible for the end-of-life costs of their products. The scheme now collects over €300 million per year, funds 4,500 collection points across the country, and has driven France's textile recycling rate to 58%. The UK government's proposed EPR for textiles, first recommended by the Environmental Audit Committee in 2019, remains at consultation stage. If implemented along French lines, WRAP estimates it could generate £500 million per year and fund the infrastructure needed to close the UK's recycling gap."
            source="Source: Refashion (French EPR body), annual report 2024. WRAP — policy impact modelling, 2025."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a
                href="https://wrap.org.uk/resources/report/textiles-market-situation-report-2024"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wiah-blue hover:underline"
              >
                WRAP — Textiles Market Situation Report
              </a>{' '}
              — waste per person estimates, recycling rates, and fast fashion purchasing data. Retrieved Feb 2026.
            </p>
            <p>
              <a
                href="https://www.gov.uk/government/statistics/uk-waste-data"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wiah-blue hover:underline"
              >
                Defra — UK Statistics on Waste
              </a>{' '}
              — disposal route breakdowns (landfill, incineration, export). Retrieved Feb 2026.
            </p>
            <p>
              <a
                href="https://publications.parliament.uk/pa/cm201719/cmselect/cmenvaud/1952/1952.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wiah-blue hover:underline"
              >
                Environmental Audit Committee — Fixing Fashion (2019)
              </a>{' '}
              — parliamentary inquiry into clothing consumption and sustainability.
            </p>
            <p className="mt-4">
              Textile waste estimates rely on waste composition analysis conducted by WRAP, supplemented by
              production and import/export modelling. Recycling rates include charity donations, many of which
              are re-exported. The 2020 dip reflects COVID-19 disruption to retail and waste streams. All
              figures are UK-wide unless otherwise stated.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}

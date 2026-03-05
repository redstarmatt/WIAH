'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface RdGdpPoint {
  year: number;
  percentGDP: number;
}

interface CountryComparison {
  country: string;
  percentGDP: number;
}

interface RdInvestmentData {
  ukRdGdp: RdGdpPoint[];
  internationalComparison2021: CountryComparison[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function RdInvestmentPage() {
  const [data, setData] = useState<RdInvestmentData | null>(null);

  useEffect(() => {
    fetch('/data/rd-investment/rd_investment.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const rdSeries: Series[] = data
    ? [{
        id: 'uk-rd',
        label: 'UK R&D as % of GDP',
        colour: '#E63946',
        data: data.ukRdGdp.map(d => ({
          date: yearToDate(d.year),
          value: d.percentGDP,
        })),
      }]
    : [];

  const latest = data?.ukRdGdp[data.ukRdGdp.length - 1];

  return (
    <>
      <TopicNav topic="Economy & Work" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="R&D Investment"
          question="Is Britain investing enough in research and innovation?"
          finding="The UK spent 1.73% of GDP on R&D in 2021 — well below the OECD target of 2.4% and the G7 average of 2.66%. South Korea invests 4.93%. The UK's technology industries grow in spite of, not because of, public investment."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK spent 1.73% of its GDP on research and development in 2021 &mdash; a figure that has barely shifted since 2010. The OECD set a target of 2.4% more than two decades ago; the UK has never come close. The G7 average is 2.66%; the United States invests 3.46%, Germany 3.14%, South Korea 4.93%. Business R&D accounts for roughly two-thirds of the UK total, concentrated in pharmaceuticals, aerospace, and software &mdash; while government-funded foundational research, where private markets systematically underinvest, has been squeezed as a share of GDP since the 1980s. The UK was excluded from Horizon Europe &mdash; the EU&apos;s &euro;95.5 billion research programme &mdash; for nearly three years following Brexit, losing collaborations and migrating researchers before readmission in January 2024. Meeting the 2.4% OECD target would require approximately &pound;18 billion in additional investment annually.</p>
            <p>The underinvestment is partly an explanation for the UK&apos;s persistent productivity puzzle: output per worker barely grew in the 2010s despite historically low interest rates and rising employment. Countries that invest more in R&D &mdash; Germany, the United States, South Korea &mdash; have sustained higher productivity growth. The UK&apos;s genuine strengths &mdash; four of the world&apos;s top twenty universities, internationally competitive AI research in London, Cambridge, and Edinburgh, and a life sciences sector that generated a significant return through the COVID vaccine programme &mdash; are more fragile than they appear if the underlying investment infrastructure remains underfunded.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-trend', label: 'UK trend' },
          { id: 'sec-international', label: 'International comparison' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="UK R&D as % of GDP"
              value={latest ? latest.percentGDP.toFixed(2) : '1.73'}
              unit="%"
              direction="flat"
              polarity="up-is-good"
              changeText="Barely changed since 2010 · OECD target is 2.4%"
              sparklineData={[1.62, 1.61, 1.67, 1.67, 1.71, 1.73, 1.73]}
              source="ONS GERD · 2021"
              href="#sec-overview"/>
            <MetricCard
              label="Rank among G7"
              value="6th"
              unit="/7"
              direction="flat"
              polarity="up-is-good"
              changeText="Only Italy (1.51%) spends less · US 3.46%, Germany 3.14%"
              sparklineData={[7, 6, 6, 6, 6, 6, 6]}
              source="OECD Main S&T Indicators · 2021"
              href="#sec-trend"/>
            <MetricCard
              label="Gap to OECD target"
              value="−0.67"
              unit="pp of GDP"
              direction="flat"
              polarity="up-is-good"
              changeText="Target is 2.4% · gap represents ~£18bn/yr additional investment needed"
              sparklineData={[0.78, 0.79, 0.73, 0.73, 0.69, 0.67, 0.67]}
              source="OECD / ONS"
              href="#sec-international"/>
          </div>
        </ScrollReveal>

        {/* Chart: UK R&D trend */}
        <ScrollReveal>
          <div id="sec-trend" className="mb-12">
            <LineChart
              series={rdSeries}
              title="UK gross domestic R&D expenditure as % of GDP, 2010–2021"
              subtitle="Flat since 2010. The OECD target of 2.4% has never been reached."
              yLabel="% of GDP"
              source={{
                name: 'ONS',
                dataset: 'Gross Domestic Expenditure on Research and Development (GERD)',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* International comparison bar chart */}
        <ScrollReveal>
          <div id="sec-international" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-1">
                R&D expenditure as % of GDP — international comparison, 2021
              </h2>
              <p className="text-sm text-wiah-mid mb-6">The UK ranks 6th out of G7 nations. South Korea and the US invest more than twice as much.</p>
              <div className="mt-4 space-y-4">
                {data?.internationalComparison2021
                  .slice()
                  .sort((a, b) => b.percentGDP - a.percentGDP)
                  .map((c) => {
                    const pct = (c.percentGDP / 5) * 100;
                    const isUK = c.country === 'UK';
                    return (
                      <div key={c.country}>
                        <div className="flex justify-between items-center mb-1">
                          <span className={`text-sm font-medium ${isUK ? 'text-wiah-red font-bold' : 'text-wiah-black'}`}>
                            {c.country}{isUK ? ' ◀' : ''}
                          </span>
                          <span className="font-mono text-sm font-bold text-wiah-black">{c.percentGDP}%</span>
                        </div>
                        <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                          <div
                            className="h-full rounded-sm transition-all"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: isUK ? '#E63946' : '#264653',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: OECD Main Science and Technology Indicators · 2021</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Sources */}
        <ScrollReveal>
          <div className="border-t border-wiah-border pt-8 mt-8">
            <h2 className="text-base font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
            <ul className="space-y-2 font-mono text-xs text-wiah-mid">
              <li>
                <a href="https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/researchanddevelopmentexpenditure/bulletins/ukgrossdomesticexpenditureonresearchanddevelopment/2021" className="underline hover:text-wiah-black" target="_blank" rel="noopener noreferrer">
                  ONS Gross Domestic Expenditure on Research and Development (GERD)
                </a>
                {' '}— UK R&D as % of GDP, annual
              </li>
              <li>
                <a href="https://www.oecd.org/sti/msti.htm" className="underline hover:text-wiah-black" target="_blank" rel="noopener noreferrer">
                  OECD Main Science and Technology Indicators
                </a>
                {' '}— international comparison of R&D expenditure
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </main>
    </>
  );
}

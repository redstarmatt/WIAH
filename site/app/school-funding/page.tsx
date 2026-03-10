'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ─────────────────────────────────────────────────────────────────────

interface PerPupilPoint {
  year: number;
  realTerms: number;
}

interface SendDeficitPoint {
  year: number;
  deficitBn: number;
}

interface SixthFormIndexPoint {
  year: number;
  index: number;
}

interface SchoolFundingData {
  perPupilFunding: PerPupilPoint[];
  sendFundingDeficit: SendDeficitPoint[];
  sixthFormFundingIndex: SixthFormIndexPoint[];
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SchoolFundingPage() {
  const [data, setData] = useState<SchoolFundingData | null>(null);

  useEffect(() => {
    fetch('/data/school-funding/school_funding.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const fundingSeries: Series[] = data
    ? [
        {
          id: 'real-per-pupil',
          label: 'Real-terms per-pupil funding (£)',
          colour: '#E63946',
          data: data.perPupilFunding.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.realTerms,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="School Funding" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="School Funding"
          question="Do schools have enough money?"
          finding="Real per-pupil school funding in England in 2023 is still 9% below its 2009 peak, despite recent increases. Special educational needs funding carries a £2.1 billion structural deficit across councils. Sixth-form funding has been cut by 20% in real terms since 2010."
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              English schools entered the 2010s on the back of significant real-terms investment,
              then faced nearly a decade of cuts. Per-pupil funding in real terms fell from around
              £6,500 in 2009 to £5,600 in 2017 — a drop of nearly 14%. Nominal spending has since
              recovered, but when adjusted for inflation and rising costs, the 2023 figure of around
              £5,915 remains 9% below the 2009 peak. The gap is not evenly distributed: schools in
              the most deprived areas, which rely heavily on deprivation-weighted funding, have
              experienced the deepest sustained pressure.
            </p>
            <p>
              The cuts fell hardest on the areas least visible in headline results. Teaching
              assistant numbers dropped by over 15% between 2014 and 2021. Music, art, and
              drama provision was scaled back. Pastoral and mental health support staff were
              reduced or eliminated entirely. These are the inputs that matter most for
              disadvantaged pupils who lack the family resources to compensate, yet they are
              precisely what squeezed budgets cut first.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-funding', label: 'Per-Pupil Funding' },
          { id: 'sec-send', label: 'SEND Deficit' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Real per-pupil funding vs 2009 peak"
              value="−9"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="£5,915 in 2023 vs £6,500 in 2009 · gap partially closed since 2017"
              sparklineData={[6500, 6200, 5900, 5700, 5600, 5800, 6100, 5915]}
              source="IFS Education Spending Review · 2023"
            />
            <MetricCard
              label="SEND funding deficit across councils"
              value="£2.1bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Growing every year since 2018 · councils unable to meet legal duties"
              sparklineData={[0.3, 0.6, 0.9, 1.3, 1.7, 2.1]}
              source="ADCS / IFS · 2023"
            />
            <MetricCard
              label="16–18 funding (real terms since 2010)"
              value="−20"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="Sixth-form funding cut deepest · affecting A-level course range"
              sparklineData={[100, 94, 88, 84, 80]}
              source="IFS School Spending · 2023"
            />
          </div>
        

        <ScrollReveal>
          <div id="sec-funding" className="mb-12">
            <LineChart
              series={fundingSeries}
              title="Real per-pupil school funding, England, 2009–2023"
              subtitle="Constant prices, adjusted for inflation. Covers all state-funded schools."
              yLabel="Real-terms £ per pupil"

              annotations={[
                { date: new Date(2017, 0), label: '2017: real-terms low' },
                { date: new Date(2019, 0), label: '2019: recovery begins' },
              ]}
            />
            <p className="font-mono text-[11px] text-wiah-mid mt-2">
              Source:{' '}
              <a
                href="https://ifs.org.uk/education-spending"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-wiah-black"
              >
                Institute for Fiscal Studies Education Spending data
              </a>{' '}
              · 2023
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-sources" className="border-t border-wiah-border pt-8 mt-8">
            <h2 className="text-base font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
            <ul className="font-mono text-[11px] text-wiah-mid space-y-2">
              <li>
                <a
                  href="https://ifs.org.uk/education-spending"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  Institute for Fiscal Studies — Education Spending data
                </a>{' '}
                · Annual
              </li>
              <li>
                <a
                  href="https://adcs.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  ADCS — SEND Funding Survey
                </a>{' '}
                · Annual
              </li>
            </ul>
          </div>
        </ScrollReveal>
              <RelatedTopics />
      </main>
    </>
  );
}

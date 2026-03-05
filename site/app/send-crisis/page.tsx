'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ─────────────────────────────────────────────────────────────────────

interface EhcpCountPoint {
  year: number;
  thousands: number;
}

interface WaitTimePoint {
  year: number;
  avgWeeks: number;
}

interface TribunalPoint {
  year: number;
  parentsWin: number;
}

interface SendCrisisData {
  ehcpCount: EhcpCountPoint[];
  waitTimesWeeks: WaitTimePoint[];
  tribunalOutcomes: TribunalPoint[];
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SendCrisisPage() {
  const [data, setData] = useState<SendCrisisData | null>(null);

  useEffect(() => {
    fetch('/data/send-crisis/send_crisis.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const ehcpSeries: Series[] = data
    ? [
        {
          id: 'ehcp-count',
          label: 'Children with EHCPs (thousands)',
          colour: '#E63946',
          data: data.ehcpCount.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.thousands,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="SEND Crisis" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="SEND Crisis"
          question="Are children with special educational needs getting the support they need?"
          finding="576,000 children in England have an Education, Health and Care Plan — up 143% since 2014. The average wait is 28 weeks, against a 20-week legal limit. When parents appeal to tribunal, they win 88% of the time — pointing to systematic underprovision."
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              An Education, Health and Care Plan (EHCP) is a legally binding document that
              sets out the support a child with special educational needs is entitled to receive.
              The number of children with EHCPs in England has grown from 237,000 in 2014 to
              576,000 in 2023 — a 143% increase. This reflects rising identification of autism,
              ADHD, speech and language needs, and mental health conditions, alongside
              post-pandemic increases in complexity of need. Demand is outstripping every part
              of the system designed to meet it.
            </p>
            <p>
              The law requires local authorities to complete an EHCP assessment and issue a
              plan within 20 weeks of a request. In 2023, the average wait was 28 weeks —
              40% over the legal limit. Fewer than half of new EHCPs are issued within the
              legal timeframe. Families spend months in a system that is not only failing
              to meet deadlines but is actively resistant to requests: refusal rates have
              increased as councils try to manage demand within constrained budgets.
            </p>
            <p>
              The tribunal data exposes the scale of the failure. When parents challenge
              a council's decision on EHCP provision at the SEND tribunal, they win 88%
              of cases. This is not the profile of a system making borderline decisions
              in hard cases: it is a system routinely refusing lawful provision, forcing
              families through adversarial legal processes at significant financial and
              emotional cost. The families who cannot afford to appeal, or who do not know
              they can, go without.
            </p>
            <p>
              The financial picture is a key part of the explanation. Councils collectively
              carry a high-needs budget deficit of over £2 billion, and the gap grows every
              year. The high-needs block was not uplifted to match the rise in demand, so
              councils have been rationing by definition, not by need. The result is a
              generation of children with legally recognised needs who are not receiving
              the support the law entitles them to — some out of school entirely, some
              in placements far from home, some waiting years for an appropriate setting.
            </p>
            <p>
              The government's 2023 SEND Review acknowledged the system was failing and
              proposed a new national framework, but sector bodies have warned that
              without significant new funding the proposals will not close the gap between
              entitlement and provision. Demand shows no signs of slowing: referrals for
              autism assessment and ADHD diagnosis are at record levels in both children's
              and adult services. The structural mismatch between need and resource
              will worsen unless funding keeps pace.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-ehcp', label: 'EHCP Growth' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Children with EHCPs"
              value="576k"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up 143% since 2014 · rising demand outstripping provision"
              sparklineData={[237, 267, 316, 390, 489, 576]}
              source="DfE SEN Statistics · January 2023"
            />
            <MetricCard
              label="Average EHCP assessment wait"
              value="28"
              unit="weeks"
              direction="up"
              polarity="up-is-bad"
              changeText="Legal maximum is 20 weeks · almost all councils missing target"
              sparklineData={[23, 24, 25, 26, 27, 28]}
              source="DfE SEN Statistics · 2023"
            />
            <MetricCard
              label="Parents winning at SEND tribunal"
              value="88"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="When councils deny provision, 88% of appeals succeed · systemic failure"
              sparklineData={[73, 79, 80, 84, 88, 88]}
              source="MOJ Tribunal Statistics · 2022/23"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-ehcp" className="mb-12">
            <LineChart
              series={ehcpSeries}
              title="Children with Education, Health and Care Plans, England, 2014–2023"
              subtitle="Number of EHCPs maintained by local authorities. January census each year."
              yLabel="Thousands of children"

              annotations={[
                { date: new Date(2017, 0), label: '2017: EHCPs replace Statements' },
                { date: new Date(2020, 2), label: '2020: COVID-19' },
              ]}
            />
            <p className="font-mono text-[11px] text-wiah-mid mt-2">
              Source:{' '}
              <a
                href="https://explore-education-statistics.service.gov.uk/find-statistics/special-educational-needs-in-england"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-wiah-black"
              >
                DfE — Special Educational Needs Statistics
              </a>{' '}
              · Annual
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-sources" className="border-t border-wiah-border pt-8 mt-8">
            <h2 className="text-base font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
            <ul className="font-mono text-[11px] text-wiah-mid space-y-2">
              <li>
                <a
                  href="https://explore-education-statistics.service.gov.uk/find-statistics/special-educational-needs-in-england"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  DfE — Special Educational Needs in England
                </a>{' '}
                · Annual
              </li>
              <li>
                <a
                  href="https://www.ipsea.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  IPSEA — Independent Provider of Special Education Advice
                </a>
              </li>
              <li>
                <a
                  href="https://adcs.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  ADCS — Association of Directors of Children's Services
                </a>
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </main>
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ─────────────────────────────────────────────────────────────────────

interface VeracityItem {
  profession: string;
  trustPercent: number;
}

interface NhsTrustPoint {
  year: number;
  trustPercent: number;
}

interface ParliamentTrustPoint {
  year: number;
  trustPercent: number;
}

interface TrustInstitutionsData {
  veracityIndex2023: VeracityItem[];
  nhsTrustTimeSeries: NhsTrustPoint[];
  parliamentTrust: ParliamentTrustPoint[];
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TrustInstitutionsPage() {
  const [data, setData] = useState<TrustInstitutionsData | null>(null);

  useEffect(() => {
    fetch('/data/trust-institutions/trust_institutions.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const trustSeries: Series[] = data
    ? [
        {
          id: 'nhs-trust',
          label: 'Trust in NHS',
          colour: '#2A9D8F',
          data: data.nhsTrustTimeSeries.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.trustPercent,
          })),
        },
        {
          id: 'parliament-trust',
          label: 'Trust in politicians',
          colour: '#E63946',
          data: data.parliamentTrust.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.trustPercent,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Trust in Institutions" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Trust in Institutions"
          question="Do people still trust British institutions?"
          finding="Trust in politicians has fallen to just 12% — the lowest ever recorded. Trust in the NHS has fallen from 72% to 51% since 2010. But nurses (94%) and doctors (91%) remain among the most trusted professionals in the world."
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The Ipsos Veracity Index, which has tracked public trust in professions
              and institutions since 1983, recorded in 2023 that just 12% of the British
              public trusted politicians to tell the truth — a record low since the survey
              began. This is not a product of a single scandal: it reflects cumulative
              disillusionment with a political class that has, in the public's perception,
              consistently failed to deliver on commitments, prioritised party over country,
              and been found to have misled the public on matters ranging from Brexit
              to COVID compliance to economic projections. The Brexit process, the Johnson
              government's conduct, and the Truss mini-budget shock all contributed to
              a sustained erosion of credibility.
            </p>
            <p>
              NHS institutional trust presents a more complicated picture. The British Social
              Attitudes survey has tracked trust in the NHS as an institution for decades.
              In 2010, around 72% of the public expressed satisfaction with the NHS.
              By 2023, that figure had fallen to 51% — the lowest since the survey began.
              This decline is specifically about the institution — waiting times, access,
              funding adequacy — not about individual care. Nurses and doctors remain among
              the most trusted professionals in the world: the Veracity Index puts nurses
              at 94% and doctors at 91%, figures that have been stable for decades.
              People trust the staff but not the system.
            </p>
            <p>
              This distinction matters enormously for policy and public health. Low institutional
              trust in the NHS has consequences for uptake of screening programmes, vaccination,
              and preventive care. If people believe the system will not help them, they may
              not present when they should. But high trust in individual clinicians suggests
              that the relationship between patient and practitioner remains intact — a
              significant protective factor that good policy should reinforce, not undermine.
            </p>
            <p>
              Low political trust has more diffuse but equally serious consequences. Democratic
              institutions depend on some baseline of trust to function. When trust in politicians
              falls to 12%, it does not merely reflect dissatisfaction — it reflects a withdrawal
              of legitimacy from the institutions themselves. Voter turnout, compliance with
              policy, civic participation, and willingness to accept difficult trade-offs all
              decline when political trust is low. The UK is not unique in this — the Edelman
              Trust Barometer documents trust declines across most Western democracies — but
              the depth of the decline here, and the specific triggers, make it a domestic
              emergency as well as a global trend.
            </p>
            <p>
              Trust in scientists (87%) and teachers (85%) remains high, as does trust in
              judges (72%). Trust in police (61%) has declined from previous decades,
              reflecting specific incidents — most acutely the murder of Sarah Everard by
              a serving Metropolitan Police officer — alongside broader concerns about
              institutional racism and misconduct. Rebuilding trust requires not just
              communication but demonstrable performance: clear standards, transparent
              accountability, and genuine consequences for failure at an institutional level.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-trust-trend', label: 'Trust Over Time' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Trust in politicians"
              value="12"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="Lowest ever in Ipsos Veracity Index · down from 21% in 2010"
              sparklineData={[21, 18, 20, 17, 19, 15, 12]}
              source="Ipsos Veracity Index · 2023"
            />
            <MetricCard
              label="Trust in NHS (overall institution)"
              value="51"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 72% in 2010 · waiting lists and coverage driving decline"
              sparklineData={[72, 70, 66, 62, 68, 71, 54, 51]}
              source="British Social Attitudes / Ipsos · 2023"
            />
            <MetricCard
              label="Trust in nurses"
              value="94"
              unit="%"
              direction="flat"
              polarity="up-is-good"
              changeText="Highest of any profession · doctors 91%, scientists 87%"
              sparklineData={[92, 93, 93, 94, 95, 94, 94]}
              source="Ipsos Veracity Index · 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-trust-trend" className="mb-12">
            <LineChart
              series={trustSeries}
              title="Public trust in the NHS and politicians, 2010–2023"
              subtitle="% who say they trust them to tell the truth / express satisfaction. NHS: British Social Attitudes. Politicians: Ipsos Veracity Index."
              yLabel="% who trust them to tell the truth"

              annotations={[
                { date: new Date(2016, 0), label: '2016: Brexit referendum' },
                { date: new Date(2020, 2), label: '2020: COVID-19' },
                { date: new Date(2022, 0), label: '2022: Partygate / Truss' },
              ]}
            />
            <p className="font-mono text-[11px] text-wiah-mid mt-2">
              Source:{' '}
              <a
                href="https://www.ipsos.com/en-uk/trust-in-professions-veracity-index"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-wiah-black"
              >
                Ipsos Veracity Index
              </a>{' '}
              ·{' '}
              <a
                href="https://natcen.ac.uk/our-research/research/british-social-attitudes"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-wiah-black"
              >
                British Social Attitudes Survey
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
                  href="https://www.ipsos.com/en-uk/trust-in-professions-veracity-index"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  Ipsos — Veracity Index (Trust in Professions)
                </a>{' '}
                · Annual
              </li>
              <li>
                <a
                  href="https://natcen.ac.uk/our-research/research/british-social-attitudes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  NatCen — British Social Attitudes Survey
                </a>{' '}
                · Annual
              </li>
              <li>
                <a
                  href="https://www.edelman.com/trust/trust-barometer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  Edelman — Trust Barometer
                </a>{' '}
                · Annual
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </main>
    </>
  );
}

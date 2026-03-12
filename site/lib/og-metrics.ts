import fs from 'fs';
import path from 'path';

interface OgMetric {
  metric: string;
  subtitle: string;
}

function readJson(relativePath: string): unknown {
  const fullPath = path.join(process.cwd(), 'public', 'data', relativePath);
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
}

function last<T>(arr: T[]): T {
  return arr[arr.length - 1];
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000).toLocaleString()}K`;
  return n.toLocaleString();
}

// Fallbacks if data reads fail
const FALLBACKS: Record<string, OgMetric> = {
  health:      { metric: '6.0 days',  subtitle: 'average GP wait time' },
  housing:     { metric: '7.7x',      subtitle: 'house price to earnings ratio' },
  water:       { metric: '2,963 Ml/d',subtitle: 'water leaking from pipes daily' },
  justice:     { metric: '7.3%',      subtitle: 'of crimes result in a charge' },
  energy:      { metric: '45%',       subtitle: 'of electricity from renewables' },
  environment: { metric: '-50%',      subtitle: 'UK emissions since 1990' },
  education:   { metric: '20%',       subtitle: 'of pupils persistently absent' },
  economy:     { metric: '£643/wk',   subtitle: 'median weekly earnings (2025)' },
  immigration: { metric: '204K',      subtitle: 'net migration to UK (2025)' },
  broadband:   { metric: '126 Mbps',  subtitle: 'median broadband speed' },
  obesity:     { metric: '28%',       subtitle: 'of UK adults are obese' },
  poverty:     { metric: '3.4M',      subtitle: 'children in poverty' },
  'social-care':{ metric: '13,200',   subtitle: 'patients delayed in hospital daily' },
  transport:   { metric: '19.6%',     subtitle: 'of new cars are electric' },
};

export function getOgMetrics(topic: string): OgMetric {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r = (p: string) => readJson(p) as any;

    switch (topic) {
      case 'health': {
        const d = r('health/gp_appointments.json');
        const latest = last<{ date: string; avgWaitDays: number }>(d.national.timeSeries);
        return {
          metric: `${latest.avgWaitDays} days`,
          subtitle: `average GP wait time (${latest.date})`,
        };
      }
      case 'housing': {
        const d = r('housing/housing.json');
        const latest = last<{ year: number; ratio: number }>(d.national.affordability.timeSeries);
        return {
          metric: `${latest.ratio}x`,
          subtitle: `house price to earnings ratio (${latest.year})`,
        };
      }
      case 'water': {
        const d = r('water/leakage.json');
        const latest = last<{ year: string; leakageMld: number }>(d.nationalTimeSeries);
        return {
          metric: `${latest.leakageMld.toLocaleString()} Ml/d`,
          subtitle: `water leaking from pipes (${latest.year})`,
        };
      }
      case 'justice': {
        const d = r('justice/justice.json');
        const latest = last<{ date: string; pct: number }>(d.national.chargeRate.timeSeries);
        return {
          metric: `${latest.pct}%`,
          subtitle: `of crimes result in a charge (${latest.date})`,
        };
      }
      case 'energy': {
        const d = r('energy/energy.json');
        const latest = last<{ year: number; pct: number }>(d.national.renewables.sharePct);
        return {
          metric: `${latest.pct}%`,
          subtitle: `of electricity from renewables (${latest.year})`,
        };
      }
      case 'environment': {
        const d = r('environment/environment.json');
        const ts: { year: number; mtCO2e: number }[] = d.national.ghgEmissions.timeSeries;
        const baseline = ts[0].mtCO2e;
        const latest = last(ts);
        const pct = Math.round(((latest.mtCO2e - baseline) / baseline) * 100);
        return {
          metric: `${pct}%`,
          subtitle: `change in UK emissions since 1990 (${latest.year})`,
        };
      }
      case 'education': {
        const d = r('education/education.json');
        const latest = last<{ year: string; persistentAbsencePct: number }>(d.national.absence.timeSeries);
        return {
          metric: `${latest.persistentAbsencePct}%`,
          subtitle: `pupils persistently absent (${latest.year})`,
        };
      }
      case 'economy': {
        const d = r('economy/ashe.json');
        const latest = last<{ year: number; p50: number }>(d.national);
        return {
          metric: `£${latest.p50}/wk`,
          subtitle: `median weekly earnings (${latest.year})`,
        };
      }
      case 'immigration': {
        const d = r('immigration/immigration.json');
        const h = d.headlines;
        return {
          metric: formatNumber(h.netMigration),
          subtitle: `net migration to the UK (${h.netMigrationPeriod})`,
        };
      }
      case 'broadband': {
        const d = r('broadband/broadband.json');
        const latest = last<{ year: number; medianMbps: number }>(d.national.speeds.medianTimeSeries);
        return {
          metric: `${latest.medianMbps} Mbps`,
          subtitle: `median broadband speed (${latest.year})`,
        };
      }
      case 'obesity': {
        const d = r('obesity/obesity.json');
        const latest = last<{ year: number; obesePct: number }>(d.national.obesityPrevalence.timeSeries);
        return {
          metric: `${latest.obesePct}%`,
          subtitle: `of UK adults are obese (${latest.year})`,
        };
      }
      case 'poverty': {
        const d = r('poverty/poverty.json');
        const latest = last<{ year: number; millions: number }>(d.national.childPoverty.timeSeries);
        return {
          metric: `${latest.millions}M`,
          subtitle: `children in poverty (${latest.year})`,
        };
      }
      case 'social-care': {
        const d = r('social-care/social_care.json');
        const latest = last<{ date: string; avgDailyDelayed: number }>(d.national.dischargeDelays.timeSeries);
        return {
          metric: latest.avgDailyDelayed.toLocaleString(),
          subtitle: `patients delayed in hospital daily (${latest.date})`,
        };
      }
      case 'transport': {
        const d = r('transport/road_safety.json');
        const latest = last<{ year: number; evSharePct: number }>(d.evRegistrations);
        return {
          metric: `${latest.evSharePct}%`,
          subtitle: `of new cars are electric (${latest.year})`,
        };
      }
      default:
        return FALLBACKS[topic] ?? { metric: '', subtitle: '' };
    }
  } catch {
    return FALLBACKS[topic] ?? { metric: '', subtitle: '' };
  }
}

#!/usr/bin/env node
/**
 * fix-remaining-urls.mjs
 *
 * One-shot script: applies known org → URL mappings to any editorialRef
 * entries that still have no url field. Reads each affected page, inserts
 * the url field, and writes back.
 *
 * Run from repo root: node scripts/fix-remaining-urls.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Mapping: partial org name (lowercased, trimmed) → url
// Keys are matched with String.includes() against the lowercased name field.
const URL_MAP = [
  // Government departments / agencies
  ['hm government',            'https://www.gov.uk/government/statistics'],
  ['beis',                     'https://www.gov.uk/government/organisations/department-for-business-energy-and-industrial-strategy/about/statistics'],
  ['public health england',    'https://www.gov.uk/government/organisations/uk-health-security-agency/about/statistics'],
  ['scottish government',      'https://www.gov.scot/publications/'],
  ['who',                      'https://www.who.int/data'],
  ['bank of england',          'https://www.bankofengland.co.uk/statistics'],
  ['oecd',                     'https://www.oecd.org/statistics/'],
  ['european commission',      'https://ec.europa.eu/eurostat/'],
  ['house of commons library', 'https://commonslibrary.parliament.uk/'],
  ['public accounts committee','https://committees.parliament.uk/committee/127/public-accounts-committee/'],
  ['uk parliament',            'https://www.parliament.uk/'],
  ['house of lords',           'https://www.parliament.uk/business/lords/'],
  ['foreign affairs select',   'https://committees.parliament.uk/committee/78/foreign-affairs-committee/'],
  ['joint committee on human rights', 'https://committees.parliament.uk/committee/93/human-rights-committee/'],
  ['law commission',           'https://lawcom.gov.uk/'],

  // Reviews / one-off inquiries
  ['dame carol black',         'https://www.gov.uk/government/publications/review-of-drugs-phase-two-report'],
  ['timpson review',           'https://www.gov.uk/government/publications/timpson-review-of-school-exclusion'],
  ['ockenden review',          'https://www.gov.uk/government/publications/final-report-of-the-ockenden-review'],
  ['donna ockenden',           'https://www.gov.uk/government/publications/final-report-of-the-ockenden-review'],
  ['east kent',                'https://www.gov.uk/government/publications/east-kent-maternity-review'],
  ['independent review of children', 'https://www.gov.uk/government/publications/independent-review-of-childrens-social-care-final-report'],
  ['baroness casey',           'https://www.gov.uk/government/publications/baroness-casey-review-final-report'],
  ['lord darzi',               'https://www.gov.uk/government/publications/independent-investigation-of-the-nhs-in-england'],
  ['cairncross review',        'https://www.gov.uk/government/publications/the-cairncross-review-a-sustainable-future-for-journalism'],
  ['dilnot commission',        'https://www.gov.uk/government/publications/fairer-care-funding-analysis-and-evidence-supporting-the-recommendations-of-the-dilnot-commission'],
  ['post office horizon',      'https://www.gov.uk/guidance/horizon-convictions-redress-scheme'],

  // Legislation
  ['social housing (regulation) act', 'https://www.legislation.gov.uk/ukpga/2023/36/contents'],
  ['kinship care act',         'https://www.legislation.gov.uk/ukpga/2023/27/contents'],
  ['transport (scotland) act', 'https://www.legislation.gov.uk/asp/2019/17/contents'],

  // NHS / health bodies
  ['nhs race and health observatory', 'https://www.nhsrho.org/research/'],
  ['nhs employers',            'https://www.nhsemployers.org/'],
  ['nhs protect',              'https://www.nhsbsa.nhs.uk/'],
  ['nhsbsa',                   'https://www.nhsbsa.nhs.uk/'],
  ['cqc',                      'https://www.cqc.org.uk/guidance-regulation/providers/information'],
  ['skills for care',          'https://www.skillsforcare.org.uk/adult-social-care-workforce-data/'],
  ['royal college of psychiatrists', 'https://www.rcpsych.ac.uk/mental-health/data'],
  ['mental health foundation', 'https://www.mentalhealth.org.uk/our-work/research/'],
  ['menopause charity',        'https://www.themenopausecharity.org/'],
  ['british menopause society','https://thebms.org.uk/'],
  ['hospice uk',               'https://www.hospiceuk.org/our-campaigns-and-policy/policy-and-influencing/research-and-publications'],
  ['healthwatch england',      'https://www.healthwatch.co.uk/reports-library'],
  ['bma',                      'https://www.bma.org.uk/advice-and-support/nhs-delivery-and-workforce/pressures/statistics'],
  ['association of ambulance', 'https://aace.org.uk/'],
  ['uk sepsis trust',          'https://sepsistrust.org/about/what-is-sepsis/sepsis-data/'],
  ['icnarc',                   'https://www.icnarc.org/our-audit-and-research/case-mix-programme/'],
  ['versus arthritis',         'https://www.versusarthritis.org/'],
  ['faculty of pain medicine', 'https://www.fpm.ac.uk/'],

  // Academic / research
  ['imperial college london',  'https://www.imperial.ac.uk/'],
  ['vrije universiteit',       'https://research.vu.nl/'],
  ['university of exeter',     'https://www.exeter.ac.uk/research/'],
  ['university college london','https://www.ucl.ac.uk/research/'],
  ['ucl',                      'https://www.ucl.ac.uk/research/'],
  ['rees centre',              'https://reescentre.education.ox.ac.uk/'],
  ['isos partnership',         'https://www.isosgroup.co.uk/'],
  ['clark & layard',           'https://cep.lse.ac.uk/'],
  ['global burden of disease', 'https://www.healthdata.org/research-analysis/gbd'],

  // Charities / advocacy / NGOs
  ['music venue trust',        'https://musicvenuetrust.com/'],
  ['pregnant then screwed',    'https://pregnantthenscrewed.com/research/'],
  ['stepchange',               'https://www.stepchange.org/policy-and-research/statistics.aspx'],
  ['cder network',             'https://www.citizensadvice.org.uk/debt-and-money/'],
  ['contextual safeguarding',  'https://www.contextualsafeguarding.org.uk/'],
  ['food foundation',          'https://foodfoundation.org.uk/'],
  ['cpag',                     'https://cpag.org.uk/research'],
  ['jrf',                      'https://www.jrf.org.uk/'],
  ['trussell trust',           'https://www.trusselltrust.org/news-and-blog/latest-stats/'],
  ['greenpeace',               'https://www.greenpeace.org.uk/'],
  ['eunomia',                  'https://www.eunomia.co.uk/reports-tools/'],
  ['wwf',                      'https://www.wwf.org.uk/'],
  ['living streets',           'https://www.livingstreets.org.uk/research-and-resources/'],
  ['civicus',                  'https://monitor.civicus.org/'],
  ['uk2070 commission',        'https://uk2070.org.uk/'],
  ['affordable housing commission', 'https://www.affordablehousingcommission.org/'],
  ['shelter',                  'https://england.shelter.org.uk/professional_resources/policy_and_research/'],
  ['national housing federation', 'https://www.housing.org.uk/resources/research-and-data/'],
  ['cpre',                     'https://www.cpre.org.uk/resources/'],
  ['wrap',                     'https://www.wrap.nii.org.uk/'],
  ['larac',                    'https://www.larac.org.uk/'],
  ['oceana',                   'https://oceana.org/'],
  ['ices',                     'https://www.ices.dk/'],
  ['kantar',                   'https://www.kantar.com/inspiration/fmcg/'],
  ['igd',                      'https://www.igd.com/Insights'],
  ['rics',                     'https://www.rics.org/profession-standards/rics-standards-and-guidance/sector-standards/built-environment/'],
  ['ipse',                     'https://www.ipse.co.uk/ipse-research.html'],
  ['cipd',                     'https://www.cipd.org/uk/knowledge/reports/'],
  ['rac foundation',           'https://www.racfoundation.org/research'],
  ['ipsea',                    'https://www.ipsea.org.uk/'],
  ['national autistic society','https://www.autism.org.uk/what-we-do/our-expertise/research'],
  ['nas',                      'https://www.autism.org.uk/what-we-do/our-expertise/research'],
  ['send tribunal',            'https://www.gov.uk/courts-tribunals/first-tier-tribunal-special-educational-needs-and-disability'],
  ['bre',                      'https://bregroup.com/'],
  ['aurora energy',            'https://www.auroraer.com/'],
  ['national grid eso',        'https://www.nationalgrideso.com/'],
  ['solar trade association',  'https://www.solar-trade.org.uk/'],
  ['owic',                     'https://www.owic.org.uk/'],
  ['dcc',                      'https://www.smartdcc.co.uk/'],
  ['naturescot',               'https://www.nature.scot/professional-advice/'],
  ['illegal money lending',    'https://www.gov.uk/government/groups/illegal-money-lending-project-steering-group'],
  ['british retail consortium','https://brc.org.uk/'],
  ['prison officers',          'https://www.poauk.org.uk/'],
  ['national crime agency',    'https://nationalcrimeagency.gov.uk/who-we-are/publications/'],
  ['ukri',                     'https://www.ukri.org/what-we-offer/browse-our-areas-of-investment-and-support/'],
  ['press gazette',            'https://pressgazette.co.uk/'],
  ['bbc panorama',             'https://www.bbc.co.uk/programmes/b006t14n'],
  ['bbc',                      'https://www.bbc.co.uk/'],
  ['tv licensing',             'https://www.tvlicensing.co.uk/about/media-centre/facts-and-figures/'],
  ['pagb',                     'https://www.pagb.co.uk/'],
  ['dhsc',                     'https://www.gov.uk/government/organisations/department-of-health-and-social-care/about/statistics'],
  ['adhd uk',                  'https://adhduk.co.uk/'],
  ['airdna',                   'https://www.airdna.co/'],
  ['staa',                     'https://www.staa.org.uk/'],
  ['rightmove',                'https://www.rightmove.co.uk/news/house-price-index/'],
  ['savills',                  'https://www.savills.co.uk/research/'],
  ['guy shrubsole',            'https://whoownsengland.org/'],
  ['dogs trust',               'https://www.dogstrust.org.uk/'],
  ['cats protection',          'https://www.cats.org.uk/'],
  ['blue cross',               'https://www.bluecross.org.uk/'],
  ['royal mail',               'https://www.royalmailgroup.com/en/responsibility/our-reporting/'],
  ['cps',                      'https://www.cps.gov.uk/'],
  ['nature mental health',     'https://www.nature.com/nmentalhealth/'],
  ['the lancet',               'https://www.thelancet.com/'],
  ['who / iarc',               'https://www.iarc.who.int/'],
  ['iarc',                     'https://www.iarc.who.int/'],
  ['shropshire council',       'https://www.shropshire.gov.uk/'],
  ['manchester housing first', 'https://hfe.homeless.org.uk/'],
  ['barratt',                  'https://www.barratthomes.co.uk/'],
  ['taylorwimpey',             'https://www.taylorwimpey.co.uk/'],
  ['persimmon',                'https://www.persimmonhomes.com/'],
  ['berkeley',                 'https://berkeleygroup.co.uk/'],
  ['transport research laboratory', 'https://www.trl.co.uk/'],
  ['which?',                   'https://www.which.co.uk/'],
  ['which',                    'https://www.which.co.uk/'],
  ['oldham council',           'https://www.oldham.gov.uk/'],
  ['ipsos',                    'https://www.ipsos.com/en-uk/'],
  ['oral health foundation',   'https://www.dentalhealth.org/research'],
  ['nhs england / oral health','https://www.england.nhs.uk/statistics/'],
  ['karma nirvana',            'https://karmanirvana.org.uk/research/'],
  ['children',                 'https://www.gov.uk/government/organisations/ofsted/about/statistics'],
  ['cipfa / bbpa',             'https://www.cipfa.org/policy-and-guidance/publications'],
  ['kids count',               'https://www.barnardos.org.uk/research'],
  ['dluhc',                    'https://www.gov.uk/government/organisations/ministry-of-housing-communities-and-local-government/about/statistics'],
];

// Files from the audit JSON that still have errors
// Re-run audit and write to a temp file to avoid buffer limits
import { execSync } from 'child_process';
import { mkdtempSync } from 'fs';
import os from 'os';

const tmpFile = '/tmp/wiah-audit-fix.json';
try {
  execSync(`node scripts/audit-citations.mjs --json > ${tmpFile}`, {
    cwd: join(__dirname, '..'),
    shell: true,
    stdio: 'inherit',
  });
} catch { /* exits 1 when errors — file still written */ }
const auditJson = JSON.parse(readFileSync(tmpFile, 'utf8'));

const affectedFiles = [...new Set(auditJson.errors.map(e => e.file))];

let totalFixed = 0;
const skipped = [];

for (const relPath of affectedFiles) {
  const absPath = join(__dirname, '..', relPath);
  let src;
  try { src = readFileSync(absPath, 'utf8'); } catch { continue; }

  let changed = false;

  // Find each ref object without a url field and try to patch it
  // Pattern: { num: N, name: '...', dataset: '...'[, date: '...'][, note: '...'] }
  // We need to insert url: '...' after the name field (or anywhere before the closing })
  const refPattern = /(\{[^{}]*?num\s*:\s*\d+[^{}]*?\})/gs;

  src = src.replace(refPattern, (refObj) => {
    if (/url\s*:/.test(refObj)) return refObj; // already has url

    const nameMatch = refObj.match(/name\s*:\s*['"]([^'"]+)['"]/);
    if (!nameMatch) return refObj;

    const name = nameMatch[1].toLowerCase();
    let foundUrl = null;

    for (const [key, url] of URL_MAP) {
      if (name.includes(key)) {
        foundUrl = url;
        break;
      }
    }

    if (!foundUrl) {
      skipped.push(nameMatch[1]);
      return refObj;
    }

    // Insert url: '...' before the closing }
    // Find the position just before the last } and insert
    const inserted = refObj.replace(
      /(\s*,?\s*)(note\s*:.*?['"][^'"]*['"]|date\s*:.*?['"][^'"]*['"])\s*(\})\s*$/s,
      (m, pre, field, close) => `${pre}${field}, url: '${foundUrl}' ${close}`
    );

    // Fallback: if the above didn't match, insert before closing }
    if (inserted === refObj) {
      const lastBrace = refObj.lastIndexOf('}');
      const result = refObj.slice(0, lastBrace) + `, url: '${foundUrl}' }`;
      totalFixed++;
      changed = true;
      return result;
    }

    if (inserted !== refObj) {
      totalFixed++;
      changed = true;
    }
    return inserted;
  });

  if (changed) {
    writeFileSync(absPath, src, 'utf8');
  }
}

console.log(`Fixed: ${totalFixed} refs`);
console.log(`Still no URL (genuinely unknown): ${[...new Set(skipped)].length} unique orgs`);
if (skipped.length) {
  console.log([...new Set(skipped)].sort().map(s => '  - ' + s).join('\n'));
}

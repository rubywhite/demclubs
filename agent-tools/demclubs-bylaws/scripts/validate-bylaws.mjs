#!/usr/bin/env node

import { readFile } from "node:fs/promises";

const path = process.argv[2];
const json = process.argv.includes("--json");

if (!path || path.startsWith("-")) {
  console.error("Usage: node scripts/validate-bylaws.mjs <bylaws.txt-or.md> [--json]");
  process.exit(2);
}

const text = (await readFile(path, "utf8")).toLocaleLowerCase();
const checks = [
  ["membership", "Voting membership and Democratic eligibility", [/voting member/, /registered democrat|register as (a )?democrat/]],
  ["two-thirds-membership", "Two-thirds Democratic membership rule", [/two[- ]thirds|2\s*\/\s*3/, /member/]],
  ["good-standing", "Definition of member in good standing", [/good standing/]],
  ["quarterly-meetings", "At least quarterly meetings", [/quarter|four times (a|per) year/]],
  ["county-notice", "Fourteen-day SDCDP meeting notice", [/14|fourteen/, /sddcp|sdcdp|county democratic party/, /notice|meeting/]],
  ["endorsement-eligibility", "Endorse only registered Democrats", [/endorse/, /registered democrat/]],
  ["candidate-invitation", "Five-business-day candidate invitation", [/five|5/, /business day/, /candidate/, /invite|notify/]],
  ["endorsement-disclaimer", "Club-only endorsement disclaimer", [/not (an |the )?(official )?endorsement/, /county|state|sdcdp|cdp/]],
  ["representatives", "Selection process for Party representatives", [/representative|associate|delegate/, /select|elect|appoint/]],
  ["amendments", "Bylaws amendment process", [/amend/]],
  ["finances", "Financial custody and reporting", [/treasurer|financial|funds/, /report|record|account/]],
  ["discipline", "Notice and response in discipline", [/discipline|suspend|remove|expel/, /notice|hearing|respond|appeal/]]
];

const results = checks.map(([id, title, patterns]) => ({
  id,
  title,
  covered: patterns.every((pattern) => pattern.test(text))
}));
const summary = {
  tool: "DemClubs bylaws coverage screen",
  rulePack: "0.2.1",
  lastVerified: "2026-09-27",
  disclaimer: "Keyword coverage is not legal sufficiency, Party approval, or a substitute for substantive review.",
  covered: results.filter((result) => result.covered).length,
  total: results.length,
  results
};

if (json) {
  console.log(JSON.stringify(summary, null, 2));
} else {
  console.log(`${summary.tool} — ${summary.covered}/${summary.total} topics detected`);
  for (const result of results) console.log(`${result.covered ? "PASS" : "REVIEW"}  ${result.title}`);
  console.log(`\n${summary.disclaimer}`);
}

process.exit(results.every((result) => result.covered) ? 0 : 1);


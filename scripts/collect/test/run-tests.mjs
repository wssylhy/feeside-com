#!/usr/bin/env node
// Offline test for the rates-scan extraction path.
//   pnpm test:collect
// Runs the EXACT production scanFields path against synthetic fixtures —
// no network. Exit 1 on any mismatch, so CI can gate selector changes.

import assert from 'assert';
import ebay from '../platforms/ebay.mjs';
import poshmark from '../platforms/poshmark.mjs';
import mercari from '../platforms/mercari.mjs';
import vinted from '../platforms/vinted.mjs';
import depop from '../platforms/depop.mjs';
import etsy from '../platforms/etsy.mjs';
import { textify, scanFields } from '../lib/util.mjs';
import { FIXTURES } from './fixtures.mjs';

const PLATFORMS = { ebay, poshmark, mercari, vinted, depop, etsy };

let failures = 0;
for (const [id, fx] of Object.entries(FIXTURES)) {
  const def = PLATFORMS[id];
  if (!def) {
    console.log('FAIL ' + id + ': no platform module');
    failures += 1;
    continue;
  }
  const text = textify(fx.html);
  const fields = scanFields(def, text, 'fixture://' + id);
  const problems = [];
  for (const [key, want] of Object.entries(fx.expected)) {
    const got = fields[key] ? fields[key].value : null;
    try {
      assert.strictEqual(got, want);
    } catch {
      problems.push(key + ': expected ' + want + ', got ' + got);
    }
  }
  if (problems.length) {
    failures += 1;
    console.log('FAIL ' + id);
    for (const p of problems) console.log('   ' + p);
  } else {
    console.log('PASS ' + id + ' (' + Object.keys(fx.expected).length + ' fields)');
  }
}

if (failures) {
  console.log(failures + ' platform(s) FAILED');
  process.exit(1);
}
console.log('all fixture tests passed');

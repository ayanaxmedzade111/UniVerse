import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getAllUniversities,
  getAzerbaijanUniversities,
  getUniversityBySlug,
  filterUniversities,
} from './universityService';

test('loads all universities and at least 15 Azerbaijan institutions', () => {
  const azUnis = getAzerbaijanUniversities();
  assert.ok(azUnis.length >= 15, `Expected >= 15 Azerbaijan institutions, got ${azUnis.length}`);

  const all = getAllUniversities();
  assert.ok(all.length > azUnis.length, 'Expected international universities in dataset too');
});

test('retrieves university by slug accurately', () => {
  const ada = getUniversityBySlug('ada-university');
  assert.ok(ada, 'ADA University should exist');
  assert.equal(ada?.city, 'Baku');

  const bsu = getUniversityBySlug('baku-state-university');
  assert.ok(bsu, 'BSU should exist');
});

test('filters universities by search query and country', () => {
  const all = getAllUniversities();
  const searchResult = filterUniversities(all, { query: 'economics' });
  assert.ok(searchResult.some((u) => u.slug === 'unec'));

  const ukOnly = filterUniversities(all, { country: 'United Kingdom' });
  assert.ok(ukOnly.every((u) => u.country === 'United Kingdom'));
  assert.ok(ukOnly.some((u) => u.slug === 'oxford-university'));
});

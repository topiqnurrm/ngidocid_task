import { test } from 'node:test';
import assert from 'node:assert';
import { sum } from './index.js';

test('sum of two positive numbers', () => {
  assert.strictEqual(sum(2, 3), 5);
});

test('sum of a positive and a negative number', () => {
  assert.strictEqual(sum(7, -2), 5);
});

test('sum of two negative numbers', () => {
  assert.strictEqual(sum(-4, -6), -10);
});

test('sum of a number and zero', () => {
  assert.strictEqual(sum(8, 0), 8);
});

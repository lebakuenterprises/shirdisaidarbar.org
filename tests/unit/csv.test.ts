import { describe, expect, it } from 'vitest';
import { parseCsv, rowsToRecords } from '../../src/lib/csv';

describe('parseCsv', () => {
  it('splits plain rows and ignores a trailing newline', () => {
    expect(parseCsv('a,b\n1,2\n')).toEqual([['a', 'b'], ['1', '2']]);
  });

  it('handles quoted commas, escaped quotes and newlines inside cells', () => {
    const text = 'Title,Description\r\n"Diwali, Lakshmi Puja","Lakshmi puja, ""aarti""\nand prasad"\r\n';
    expect(parseCsv(text)).toEqual([
      ['Title', 'Description'],
      ['Diwali, Lakshmi Puja', 'Lakshmi puja, "aarti"\nand prasad'],
    ]);
  });

  it('strips a byte-order mark and keeps empty cells', () => {
    expect(parseCsv('﻿a,,c')).toEqual([['a', '', 'c']]);
  });

  it('drops fully blank lines', () => {
    expect(parseCsv('a\n\n,\nb')).toEqual([['a'], ['b']]);
  });
});

describe('rowsToRecords', () => {
  it('keys each row by its trimmed, lower-cased header', () => {
    expect(rowsToRecords([[' Title ', 'End date'], ['Puja', '2026-11-15']])).toEqual([
      { title: 'Puja', 'end date': '2026-11-15' },
    ]);
  });

  it('returns nothing without a data row', () => {
    expect(rowsToRecords([['Title']])).toEqual([]);
    expect(rowsToRecords([])).toEqual([]);
  });
});

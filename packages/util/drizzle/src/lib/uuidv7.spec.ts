import { getTableConfig, pgTable } from 'drizzle-orm/pg-core';
import { describe, expect, it } from 'vitest';

import { uuidV7 } from './uuidv7.js';

const UUIDV7_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

describe('uuidV7', () => {
  it('compiles to SQL type "uuid"', () => {
    const t = pgTable('t', { id: uuidV7('id') });
    const [column] = getTableConfig(t).columns;
    expect(column?.getSQLType()).toBe('uuid');
  });

  it('is nullable by default', () => {
    const t = pgTable('t', { id: uuidV7('id') });
    const [column] = getTableConfig(t).columns;
    expect(column?.notNull).toBe(false);
  });

  it('becomes notNull when .notNull() is chained', () => {
    const t = pgTable('t', { id: uuidV7('id').notNull() });
    const [column] = getTableConfig(t).columns;
    expect(column?.notNull).toBe(true);
  });

  it('supplies a runtime UUIDv7 default that is unique per call', () => {
    const t = pgTable('t', { id: uuidV7('id') });
    const [column] = getTableConfig(t).columns;

    expect(column?.hasDefault).toBe(true);
    expect(column?.defaultFn).toBeTypeOf('function');

    const a = column?.defaultFn?.();
    const b = column?.defaultFn?.();
    expect(a).toMatch(UUIDV7_REGEX);
    expect(b).toMatch(UUIDV7_REGEX);
    expect(a).not.toBe(b);
  });

  it('uses the TS property name when called without an explicit name', () => {
    const t = pgTable('t', { myCol: uuidV7() });
    const [column] = getTableConfig(t).columns;
    expect(column?.name).toBe('myCol');
  });

  it('composes with .primaryKey()', () => {
    const t = pgTable('t', { id: uuidV7().notNull().primaryKey() });
    const [column] = getTableConfig(t).columns;
    expect(column?.primary).toBe(true);
    expect(column?.notNull).toBe(true);
    expect(column?.hasDefault).toBe(true);
  });
});

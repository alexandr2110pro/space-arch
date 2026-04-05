import { customType } from 'drizzle-orm/pg-core';
import { v7 } from 'uuid';

const uuidColumn = customType<{ data: string }>({
  dataType: () => 'uuid',
});

/**
 * Drizzle column builder for a PostgreSQL `uuid` column auto-filled with a
 * UUIDv7 on insert (via `uuid.v7()` through `$defaultFn`).
 *
 * Nullable by default — chain `.notNull()`, `.primaryKey()`, etc. as with
 * drizzle's built-in `uuid()`.
 *
 * The default is applied at insert time in the application layer; it does
 * NOT emit a SQL `DEFAULT` clause in migrations.
 *
 * Nullable-FK caveat: omitting the field on insert triggers `$defaultFn` and
 * produces a UUID pointing nowhere. For a truly raw nullable uuid, use
 * drizzle's built-in `uuid()` from `drizzle-orm/pg-core`.
 *
 * @example
 * const users = pgTable('users', {
 *   id:       uuidV7().primaryKey(),            // PK, auto-filled
 *   tenantId: uuidV7('tenant_id').notNull(),    // required FK
 *   parentId: uuidV7('parent_id'),              // nullable FK
 * });
 */
export const uuidV7 = (name?: string) =>
  (name === undefined ? uuidColumn() : uuidColumn(name)).$defaultFn(() => v7());

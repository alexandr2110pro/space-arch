# @space-arch/util-drizzle

Utility functions for Drizzle ORM.

## Installation

```bash
npm install @space-arch/util-drizzle
# or
pnpm add @space-arch/util-drizzle
```

## Features

- 🐻 **Lazy Initialization**: Create Drizzle instances only when needed
- 🆔 **UUIDv7 Support**: Built-in column types for UUIDv7 with automatic generation

## Usage

### Lazy Drizzle

Create a lazily initialized Drizzle instance. Useful for serverless environments where you need to resolve connection details at runtime.

```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { lazyDrizzle } from '@space-arch/util-drizzle';

const db = lazyDrizzle(
  (url) => drizzle(postgres(url)),
  () => process.env.DATABASE_URL
);

// Before using the db:
process.env['DATABASE_URL'] = await resolveConnectionString();

// Connection is established only when first query is executed
const users = await db.select().from(usersTable);
```

### UUIDv7 Column Types

PostgreSQL `uuid` columns auto-filled with UUIDv7 on insert. Nullable by default — chain `.notNull()` / `.primaryKey()` as you would with drizzle's built-in `uuid()`.

```typescript
import { pgTable } from 'drizzle-orm/pg-core';
import { uuidV7 } from '@space-arch/util-drizzle';

const users = pgTable('users', {
  id:       uuidV7().primaryKey(),           // PK, auto-filled on insert
  tenantId: uuidV7('tenant_id').notNull(),   // required FK
  parentId: uuidV7('parent_id'),             // nullable FK
});
```

The default is applied at insert time by the drizzle runtime — it does NOT emit a SQL `DEFAULT` clause in migrations. For a raw nullable uuid with no auto-default, use drizzle's built-in `uuid()` directly.

## Contributing

This package is part of the [Space Architects monorepo](../../README.md).

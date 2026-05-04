# Prisma Schema Sync Pattern

> **Status:** 📝 Draft
> **Date:** 2026-05-04
> **Topic:** Prisma ORM

## Context
Whenever changes are made to the `prisma/schema.prisma` file (e.g., adding, removing, or modifying fields), the local Prisma Client must be regenerated to reflect these changes in the types and generated client methods.

## Symptom
If the Prisma Client is not regenerated, you may see errors like:
- `Unknown argument <field_name>` in database operations.
- Types in TypeScript not matching the new schema.

## Solution
Run the following command after updating `prisma/schema.prisma`:
```bash
npx prisma generate
```

## Prevention
Always run `npx prisma generate` immediately after running `npx prisma db push` or `npx prisma migrate dev` when modifying the schema.

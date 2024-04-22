-- Revert flipr:001-first-migration from pg

BEGIN;

DROP TABLE IF EXISTS users;

COMMIT;

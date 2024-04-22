-- Verify flipr:001-first-migration on pg

BEGIN;

SELECT * FROM users LIMIT 1;

ROLLBACK;

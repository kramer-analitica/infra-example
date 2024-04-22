-- Deploy flipr:001-first-migration to pg

BEGIN;

CREATE TABLE IF NOT EXISTS users(
    id serial,
    name text
);

COMMIT;

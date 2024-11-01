BEGIN;

CREATE TABLE "role" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" text NOT NULL
);

CREATE TABLE "user" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "enterprise" text NOT NULL,
    "email" text NOT NULL,
    "firstname" text NOT NULL,
    "lastname" text NOT NULL,
    "password" text NOT NULL,
    "position" text NOT NULL,
    "process" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz,
    "role_id" int REFERENCES role(id)
);

CREATE TABLE "statement" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "site_name" text NOT NULL,
    "site_number" int NOT NULL,
    "site_town" text NOT NULL,
    "witness" text,
    "event_description" text NOT NULL,
    "info_sse_description" text,
    "user_id" int REFERENCES "user"(id),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);


COMMIT;


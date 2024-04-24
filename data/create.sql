-- SQLBook: Code
-- Deploy suivi_sse:create to pg

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


CREATE TABLE "detection_context" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" text NOT NULL
);

CREATE TABLE "work_phase" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" text NOT NULL
);

CREATE TABLE "event_type" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" text NOT NULL
);

CREATE TABLE "event_nature" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" text NOT NULL
);

CREATE TABLE "criticality" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "gravity" int NOT NULL,
    "frequency" int NOT NULL,
    "criticality_note" VARCHAR(1) NOT NULL
);

CREATE TABLE "risk_level_1" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" text NOT NULL
);

CREATE TABLE "risk_level_2" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" text
);

CREATE TABLE "risk_level_3" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" text
);

CREATE TABLE "event_origin" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" text NOT NULL
);

CREATE TABLE "statement" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "site_name" text NOT NULL,
    "site_number" int NOT NULL,
    "site_town" text NOT NULL,
    "witness" text,
    "event_description" text NOT NULL,
    "info_sse_description" text,
    "status_event" boolean DEFAULT TRUE,
    "corrective_action" text,
    "deadline_action" timestamptz,
    "action_pilot" text, 
    "action_status" boolean,
    "user_id" int REFERENCES "user"(id),
    "criticality_id" int REFERENCES criticality(id),
    "event_nature_id" int REFERENCES event_nature(id),
    "risk_level_1_id" int REFERENCES risk_level_1(id),
    "risk_level_2_id" int REFERENCES risk_level_2(id),
    "risk_level_3_id" int REFERENCES risk_level_3(id),
    "event_type_id" int REFERENCES event_type(id),
    "event_origin_id" int REFERENCES event_origin(id),
    "work_phase_id" int REFERENCES work_phase(id),
    "detection_context_id" int REFERENCES detection_context(id),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);


COMMIT;

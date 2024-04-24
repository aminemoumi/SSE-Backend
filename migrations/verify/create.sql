-- Verify suivi_sse:create on pg

BEGIN;

SELECT * FROM "statement" WHERE false;

SELECT * FROM "event_origin" WHERE false;

SELECT * FROM "risk_level_3" WHERE false;

SELECT * FROM "risk_level_2" WHERE false;

SELECT * FROM "risk_level_1" WHERE false;

SELECT * FROM "criticality" WHERE false;

SELECT * FROM "event_nature" WHERE false;

SELECT * FROM "event_type" WHERE false;

SELECT * FROM "work_phase" WHERE false;

SELECT * FROM "detection_context" WHERE false;

SELECT * FROM "user" WHERE false;

SELECT * FROM "role" WHERE false;

ROLLBACK;


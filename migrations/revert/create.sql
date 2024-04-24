-- Revert suivi_sse:create from pg

BEGIN;

DROP TABLE 
    "statement",
    "event_origin",
    "risk_level_3",
    "risk_level_2",
    "risk_level_1",
    "criticality",
    "event_nature",
    "event_type",
    "work_phase",
    "detection_context",
    "user",
    "role";

COMMIT;

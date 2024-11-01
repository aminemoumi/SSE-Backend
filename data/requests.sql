SELECT * FROM "role";

SELECT * FROM "user";

DELETE FROM
WHERE

UPDATE "user"
SET "password_changed" = false
WHERE id = 48;


SELECT 
    statement.site_name, 
    statement.site_number, 
    statement.site_town, 
    statement.witness, 
    statement.event_description, 
    statement.info_sse_description, 
    statement.status_event, 
    statement.corrective_action, 
    statement.deadline_action, 
    statement.action_pilot, 
    statement.action_status, 
	statement.created_at,
    "user".enterprise, 
    "user".email, 
    "user".firstname, 
    "user".lastname, 
    "user".position, 
    "user".process
FROM 
    statement
JOIN 
    "user" ON statement.user_id = "user".id
WHERE 
    "user".enterprise = 'DOD';

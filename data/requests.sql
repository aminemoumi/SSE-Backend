SELECT * FROM "risk_level_1";

SELECT * FROM "event_type";

SELECT * FROM "role";

SELECT * FROM "detection_context";

SELECT * FROM "event_nature";

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

    -- Je veux qu'à chaque fois qu'une information (text) est ajoutée à la colonne 
    -- "corrective_action" de la table "statement", 
    -- la colonne "action_status" passe de null à true.

    -- Crer une fonction déclenchée pour mettre à jour "action_status"
CREATE OR REPLACE FUNCTION update_action_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Vérifier si "corrective_action" est renseignée
  IF NEW.corrective_action IS NOT NULL THEN
    -- Mettre à jour action_status à true
    NEW.action_status := true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Creér un déclencheur associé à la fonction
CREATE TRIGGER update_action_status_trigger
BEFORE INSERT ON statement -- Surveille les insertions dans la table "statement"
FOR EACH ROW -- Déclenche la fonction pour chaque nouvelle ligne insérée
EXECUTE FUNCTION update_action_status();

-- Merci Yann !

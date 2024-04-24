INSERT INTO "role" ("title")
VALUES 
    ('visitor'), 
    ('user'), 
    ('admin');


INSERT INTO "user" ("enterprise", "email", "firstname", "lastname", "password", "position", "process","role_id")
VALUES
    ('DOD', 'user1@example.com', 'Jean', 'Dupont', 'password123', 'Responsable', 'Transport',2),
    ('DOD', 'user10@example.com', 'Aisha', 'Durand', 'password456', 'Responsable', 'Atelier',2 ),
    ('DOA', 'user11@example.com', 'Claude', 'Yasmin', 'password789', 'Conducteur de Travaux', 'Production',2),
    ('DOA', 'user12@example.com', 'Eustache', 'Smith', 'password879', 'Conducteur de Travaux', 'Production',2),
    ('DOD', 'user13@example.com', 'Carole', 'Li', 'password779', 'Conducteur de Travaux', 'Production',2),
    ('DOD', 'user14@example.com', 'Edith', 'Muller', 'password888', 'Conducteur de Travaux', 'Production',2),
    ('DOA', 'user15@example.com', 'Luc', 'Martinez', 'password333', 'Aide-Conducteurs', 'Production',2),
    ('DOA', 'user16@example.com', 'Marc', 'Mandarin', 'password222', 'Aide-Conducteurs', 'Production',2),
    ('DOD', 'user17@example.com', 'Yara', 'Lemoine', 'password321', 'Aide-Conducteurs', 'Production',2),
    ('DOD', 'user18@example.com', 'Muriel', 'Papescu', 'password111', 'Aide-Conducteurs', 'Production',2),
    ('DOA','user19@example.com', 'Bianca', 'Kim', 'password666', 'Encadrant de Chantier', 'Production',2),
    ('DOD','user20@example.com', 'Mouloud', 'Rossi', 'password555', 'Encadrant de Chantier', 'Production',2),
    ('DOA','user5@example.com', 'Mickaël', 'Bernard', 'password456', 'Encadrant de Chantier', 'Production',2),
    ('DOA','user21@example.com', 'Charly', 'Dubois', 'password654', 'Encadrant de Chantier', 'Production',2),
    ('DOA','user22@example.com', 'Raoul', 'Suzuki', 'password393', 'Encadrant de Chantier', 'Production',2),
    ('DOA','user23@example.com', 'Mohammed', 'Ivanov', 'password464', 'Encadrant de Chantier', 'Production',2),
    ('DOA','user24@example.com', 'Olga', 'Johasson', 'password654', 'Encadrant de Chantier', 'Production',2),
    ('DOA','user6@example.com', 'Pedro', 'Patel', 'password999', 'Encadrant de Chantier', 'Production',2),
    ('DOD','user25@example.com', 'Thiago', 'Nguyen', 'password888', 'Encadrant de Chantier', 'Production',2),
    ('DOA','user26@example.com', 'Aiden', 'Roux', 'password777', 'Encadrant de Chantier', 'Production',2),
    ('DOA','user27@example.com', 'Yara', 'Cohen', 'password978', 'Encadrant de Chantier', 'Production',2),
    ('DOA','user28@example.com', 'Aron', 'Smirnov', 'password979', 'Encadrant de Chantier', 'Production',2),
    ('DOD','user29@example.com', 'Ahmed', 'Murpy', 'password980', 'Encadrant de Chantier', 'Production',2),
    ('DOD','user30@example.com', 'Julie', 'Novack', 'password987', 'Encadrant de Chantier', 'Production',2),
    ('DOD','user31@example.com', 'Wei', 'Santos', 'password988', 'Encadrant de Chantier', 'Production',2),
    ('DOD','user7@example.com', 'Nicolas', 'Papadopoulos', 'password989', 'Encadrant de Chantier', 'Production',2),
    ('DOD', 'user8@example.com', 'Isabelle', 'Jansen', 'password1000','Animateur SSE', 'SSE',3 ),
    ('DOD', 'user32@example.com', 'Fabio', 'Abdallah', 'password1001','Animateur SSE', 'SSE',3 ),
    ('DOD', 'user33@example.com', 'Ravi', 'Taylor', 'password1002','Animateur SSE', 'SSE',3 ),
    ('DOD', 'user34@example.com', 'Nia', 'Demir', 'password1003','Animateur SSE', 'SSE',3 ),
    ('DOD', 'user35@example.com', 'Olga', 'Horvat ', 'password1004','Animateur SSE', 'SSE',3 ),
    ('DOD', 'user10@example.com', 'Qasim', 'Moreau', 'password1005', 'Animateur SSE', 'SSE',3),
    ('DOD', 'user36@example.com', 'Valentina', 'Jamal', 'password1006', 'Coordinateur SSE', 'SSE',3),
    ('DOD', 'user37@example.com', 'Bianca', 'Mäkinen ', 'password3023', 'Coordinateur SSE', 'SSE',3),
    ('DOD', 'user38@example.com', 'Caleb', 'O’Sullivan', 'password2589', 'Coordinateur SSE', 'SSE',3),
    ('DOD', 'user39@example.com', 'Thomas', 'Nowak', 'password5890', 'Coordinateur SSE', 'SSE',3),
    ('DOD', 'user40@example.com', 'André', 'González', 'password3698', 'Coordinateur SSE', 'SSE',3),
    ('DOD', 'user41@example.com', 'Louis', 'Drefus', 'password3691', 'Coordinateur SSE', 'SSE',3);



INSERT INTO "detection_context" ("title")
VALUES 
    ('1/4h sécurité'),
    ('Audit CSE'),
    ('Audit MASE'),
    ('Audits 1552'),
    ('Audits chantier SSE'),
    ('Audits interne 1552'),
    ('Audits internes MASE'),
    ('Contrôles chantier'),
    ('Fiches Evènements'),
    ('Infos mail'),
    ('Remontées verbales infos Terrain'),
    ('Réunions de service'),
    ('Veille réglementaire');

INSERT INTO "work_phase" ("title")
VALUES
    ('Confinement'),
    ('Déconfinement'),
    ('Démolition manuelle'),
    ('Démolition mécanique'),
    ('Dépose'),
    ('Découpe vert'),
    ('Installation'),
    ('Retrait MCA'),
    ('Repli'),
    ('Curage manuel'),
    ('curage mécanique'),
    ('Mécanique'),
    ('Soudure'),
    ('Réception marchandise'),
    ('manutention de charge'),
    ('Evacuation déchet'),
    ('Chargement matériel'),
    ('Chargement exceptionnel'),
    ('Transport exceptionnel'),
    ('Trajet'),
    ('Autre');

INSERT INTO "event_origin" ("title")
VALUES 
    ('Défaillance Matériel'), 
    ('Comportement non adapté'), 
    ('Manque de préparation'),
    ('Manque de contrôle'),
    ('Non repect de nos standards'),
    ('Précipitation'),
    ('Méthode nos adaptée'),
    ('Management non adapté'),
    ('Briefing incomplet');

INSERT INTO "event_type" ("title")
VALUES 
    ('0. Accidents du travail'),
    ('0. Accidents Trajet'),
    ('1. 1er Soins'),
    ('2. Situations Dangereuses'),
    ('3. Non-conformités'),
    ('4. Remarques'),
    ('5. Bonnes pratiques');


INSERT INTO "event_nature" ("title")
VALUES 
    ('Sécurité'),
    ('Santé'),
    ('Environnement');


INSERT INTO "criticality" ("gravity","frequency", "criticality_note")
VALUES 
    (1, 4, 'B'),
    (1, 3, 'B'),
    (1, 2, 'C'),
    (1, 1, 'C'),
    (2, 4, 'B'),
    (2, 3, 'B'),
    (2, 2, 'C'),
    (2, 1, 'C'),
    (3, 4, 'A'),
    (3, 3, 'B'),
    (3, 2, 'B'),
    (3, 1, 'C'),
    (4, 4, 'A'),
    (4, 3, 'A'),
    (4, 2, 'A'),
    (4, 1, 'A');
    

INSERT INTO "risk_level_1" ("title")
VALUES 
    ('1. Risques de chute de hauteur'),
    ('2. Risques liés aux circulations sur chantier'),
    ('3. Risques liés à l''activité physique'),
    ('4. Risques liés à la manutention mécanique'),
    ('5. Risques liés aux équipements de travail'),
    ('6. Risques et nuisances liés au bruit'),
    ('7. Risques liés aux produits, aux émissions de fibre'),
    ('8. Risques liés aux effondrements et aux chutes d''objets'),
    ('9. Risques liés aux agents biologiques'),
    ('10. Risques liés aux ambiances thermiques'),
    ('11. Risques d''incendie, d''explosion'),
    ('12. Risques liés à l''électricité'),
    ('13. Manquements réglementaires'),
    ('14. Standards Occamiante non respectés'),
    ('15. Risques liés à la coactivité'),
    ('16. Risques environnementaux'),
    ('17. Risques routiers'),
    ('18. Point à vérifier');


INSERT INTO "risk_level_2" ("title")
VALUES
    ('Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
    ('fugit architecto similique exercitationem tempore '),
    ('xxxxxxxxx g tttttt');


INSERT INTO "risk_level_3" ("title")
VALUES
    ('Sed do eiusmod tempor incididunt ut labore et dolore'),
    ('non doloremque repellendus suscipit distinctio facere culpa assumenda aliquam perferendis'),
    ('laudantium voluptatum ipsum excepturi voluptatem');
    

INSERT INTO "statement" ("site_name", "site_number", "site_town", "witness", "event_description", "info_sse_description", "status_event", "corrective_action", "deadline_action", "action_pilot", "action_status", "user_id", "criticality_id", "event_nature_id", "risk_level_1_id", "risk_level_2_id", "risk_level_3_id", "event_type_id", "event_origin_id", "work_phase_id", "detection_context_id")
VALUES 
    ('Site A', 123, 'Ville A', 'Témoin 1', 'Description de l''événement 1', NULL, TRUE, 'Action corrective 1', '2024-02-15', 'Pilote de l''action 1', TRUE, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1),
    ('Site B', 456, 'Ville B', 'Témoin 2', 'Description de l''événement 2', 'Description SSE 2', TRUE, 'Action corrective 2', '2024-02-18', 'Pilote de l''action 2', FALSE, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2),
    ('Site C', 789, 'Ville C', 'Témoin 3', 'Description de l''événement 3', NULL, FALSE, 'Action corrective 3', '2024-02-20', 'Pilote de l''action 3', TRUE, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3),
    ('Site D', 101, 'Ville D', 'Témoin 4', 'Description de l''événement 4', NULL, TRUE, 'Action corrective 4', '2024-02-25', 'Pilote de l''action 4', TRUE, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1),
    ('Site E', 202, 'Ville E', 'Témoin 5', 'Description de l''événement 5', 'Description SSE 5', TRUE, 'Action corrective 5', '2024-03-01', 'Pilote de l''action 5', FALSE, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2),
    ('Site F', 303, 'Ville F', 'Témoin 6', 'Description de l''événement 6', 'Description SSE 6', FALSE, 'Action corrective 6', '2024-03-05', 'Pilote de l''action 6', TRUE, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3),
    ('Site G', 404, 'Ville G', 'Témoin 7', 'Description de l''événement 7', 'Description SSE 7', TRUE, 'Action corrective 7', '2024-03-10', 'Pilote de l''action 7', FALSE, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1),
    ('Site H', 505, 'Ville H', 'Témoin 8', 'Description de l''événement 8', 'Description SSE 8', TRUE, 'Action corrective 8', '2024-03-15', 'Pilote de l''action 8', TRUE, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2),
    ('Site I', 606, 'Ville I', 'Témoin 9', 'Description de l''événement 9', 'Description SSE 9', FALSE, 'Action corrective 9', '2024-03-20', 'Pilote de l''action 9', TRUE, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3),
    ('Site J', 707, 'Ville J', 'Témoin 10', 'Description de l''événement 10', 'Description SSE 10', TRUE, 'Action corrective 10', '2024-03-25', 'Pilote de l''action 10', FALSE, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1),
    ('Site K', 808, 'Ville K', 'Témoin 11', 'Description de l''événement 11', 'Description SSE 11', TRUE, 'Action corrective 11', '2024-03-30', 'Pilote de l''action 11', TRUE, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2),
    ('Site L', 909, 'Ville L', 'Témoin 12', 'Description de l''événement 12', 'Description SSE 12', FALSE, 'Action corrective 12', '2024-04-05', 'Pilote de l''action 12', FALSE, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3),
    ('Site M', 1010, 'Ville M', 'Témoin 13', 'Description de l''événement 13', 'Description SSE 13', TRUE, 'Action corrective 13', '2024-04-10', 'Pilote de l''action 13', TRUE, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1),
    ('Site N', 1111, 'Ville N', 'Témoin 14', 'Description de l''événement 14', 'Description SSE 14', TRUE, 'Action corrective 14', '2024-04-15', 'Pilote de l''action 14', FALSE, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2);




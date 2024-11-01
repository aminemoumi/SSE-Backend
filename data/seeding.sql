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


    

INSERT INTO "statement" ("site_name", "site_number", "site_town", "witness", "event_description", "info_sse_description", "user_id")
VALUES 
    ('Site A', 123, 'Ville A', 'Témoin 1', 'Description de l''événement 1', NULL, 2),
    ('Site B', 456, 'Ville B', 'Témoin 2', 'Description de l''événement 2', 'Description SSE 2', 3),
    ('Site C', 789, 'Ville C', 'Témoin 3', 'Description de l''événement 3', NULL, 2),
    ('Site D', 101, 'Ville D', 'Témoin 4', 'Description de l''événement 4', NULL, 2),
    ('Site E', 202, 'Ville E', 'Témoin 5', 'Description de l''événement 5', 'Description SSE 5', 3),
    ('Site F', 303, 'Ville F', 'Témoin 6', 'Description de l''événement 6', 'Description SSE 6', 2),
    ('Site G', 404, 'Ville G', 'Témoin 7', 'Description de l''événement 7', 'Description SSE 7', 2),
    ('Site H', 505, 'Ville H', 'Témoin 8', 'Description de l''événement 8', 'Description SSE 8', 3),
    ('Site I', 606, 'Ville I', 'Témoin 9', 'Description de l''événement 9', 'Description SSE 9', 2),
    ('Site J', 707, 'Ville J', 'Témoin 10', 'Description de l''événement 10', 'Description SSE 10', 3),
    ('Site K', 808, 'Ville K', 'Témoin 11', 'Description de l''événement 11', 'Description SSE 11', 2),
    ('Site L', 909, 'Ville L', 'Témoin 12', 'Description de l''événement 12', 'Description SSE 12', 3),
    ('Site M', 1010, 'Ville M', 'Témoin 13', 'Description de l''événement 13', 'Description SSE 13', 2),
    ('Site N', 1111, 'Ville N', 'Témoin 14', 'Description de l''événement 14', 'Description SSE 14', 3);



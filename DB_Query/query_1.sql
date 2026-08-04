CREATE TABLE todo(
_id SERIAL PRIMARY KEY,
description VARCHAR(255) NOT NULL,
is_completed BOOLEAN DEFAULT FALSE
);


SELECT table_name FROM information_schema.tables;
SELECT CURRENT_DATABASE()
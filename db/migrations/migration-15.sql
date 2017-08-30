
\connect dictionary_app_dev;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS words CASCADE;

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS words (
  id BIGSERIAL PRIMARY KEY,
  word VARCHAR(255),
  definition TEXT,
  used_in_sentence TEXT,
  user_id integer REFERENCES users(id)
);

SELECT * FROM users INNER JOIN words ON users.id = words.user_id
-- this will be used for users to add words to their database in the model sections.



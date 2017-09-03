
\connect dictionary_app_dev;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS words CASCADE;
DROP TABLE IF EXISTS users_words CASCADE;


CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_digest TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS words (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255),
  etymology TEXT,
  definition TEXT,
  examples TEXT,
  otherdefinitions TEXT,
  otherexamples TEXT,
  user_id integer REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS users_words (
  user_id integer REFERENCES users(id),
  word_id integer REFERENCES words(id)
);


-- this will be used for users to add words to their database in the model sections.

-- tomorrow morning comment out select from innner join try the create onces its been created then join table.

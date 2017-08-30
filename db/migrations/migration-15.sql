
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
  user_id integer REFERENCES users(id)
);


-- SELECT users.id, users.username, words.word, words.definition FROM words
-- JOIN users ON users.id = words.uid

SELECT * FROM users INNER JOIN words ON users.id = words.user_id
-- this will be used for users to add words to their database in the model sections.

-- INSERT INTO words (user_id, id) VALUES
--   (SELECT id FROM users),
--   (SELECT id FROM words)

-- SELECT words.id, words.word, words.definition, users.username AS user_id FROM users INNER JOIN words ON users.user_id=word.id


-- SELECT movies.movie_id, movies.title, directors.name AS director_name
-- FROM movies
-- INNER JOIN directors
-- ON movies.director_id=directors.id;

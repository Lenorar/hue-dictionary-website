
\connect dictionary_app_dev;

CREATE TABLE IF NOT EXISTS words (
  id BIGSERIAL PRIMARY KEY,
  word VARCHAR(255),
  description TEXT
);


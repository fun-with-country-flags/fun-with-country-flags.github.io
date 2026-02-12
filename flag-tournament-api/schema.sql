CREATE TABLE votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  flag_code TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  session_id TEXT
);

CREATE INDEX idx_flag_code ON votes(flag_code);
CREATE INDEX idx_timestamp ON votes(timestamp);

DROP TABLE IF EXISTS entries;

CREATE TABLE entries (
    id integer PRIMARY KEY AUTOINCREMENT,
    title TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL,
    tool TEXT,
    description TEXT NOT NULL,
    fundamental integer NOT NULL    
);


CREATE TABLE meetings (
    id SERIAL PRIMARY KEY,
    file_name TEXT NOT NULL,
    transcription TEXT,
    summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

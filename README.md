# Meeting Summarization Website

A modern web application for uploading, transcribing, and summarizing meeting audio files, with professional document generation and a blue claymorphism design.

## Project Structure

```
meeting-summarizer/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── styles/
│   │   └── types/
│   ├── public/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── utils/
│   └── package.json
├── shared/
│   └── types/
├── docs/
│   ├── API.md
│   └── SETUP.md
└── README.md
```

## Key Features
- Audio upload and processing (no storage of original audio)
- Full transcription and smart summary
- Professional document generation (PDF/DOCX)
- Blue claymorphism UI
- Supabase for data storage

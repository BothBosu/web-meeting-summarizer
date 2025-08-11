# Meeting Summarization Website

A modern web application for uploading, transcribing, and summarizing meeting audio files, with professional document generation and a blue claymorphism design.

## Key Features
- Audio upload and processing (no storage of original audio)
- Full transcription and smart summary
- Professional document generation (PDF/DOCX)
- Blue claymorphism UI
- Supabase for data storage

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/meeting-summarizer.git
    cd meeting-summarizer
    ```

2.  **Install dependencies:**

    This command will install dependencies for the root, frontend, and backend.

    ```bash
    npm run install:all
    ```

3.  **Set up environment variables:**

    Copy the example environment file in the `backend` directory:

    ```bash
    cp backend/.env.example backend/.env
    ```

    Update `backend/.env` with your credentials. See `docs/SETUP.md` for more details.

4.  **Run the development servers:**

    This will start both the frontend and backend servers concurrently.

    ```bash
    npm run dev
    ```

    The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3000`.

### Linting

This project uses ESLint for linting. A pre-commit hook is set up with `husky` and `lint-staged` to automatically lint files before they are committed.

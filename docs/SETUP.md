# Setup Instructions

## Environment Variables

To run the application, you need to set up the following environment variables in a `.env` file in the `backend` directory. You can copy the `.env.example` file to get started.

```bash
cp backend/.env.example backend/.env
```

### Supabase

-   `SUPABASE_URL`: Your Supabase project URL. You can find this in your Supabase project's API settings.
-   `SUPABASE_ANON_KEY`: Your Supabase project's anonymous key. You can find this in your Supabase project's API settings.
-   `SUPABASE_SERVICE_KEY`: Your Supabase project's service role key. You can find this in your Supabase project's API settings. **Keep this secret!**

### Large Language Model (LLM) API Key

You can use either OpenAI or Anthropic for transcription and summarization. Choose one and add the corresponding API key to your `.env` file.

-   `OPENAI_API_KEY`: Your OpenAI API key.
-   `ANTHROPIC_API_KEY`: Your Anthropic API key.

### JWT Secret

-   `JWT_SECRET`: A secret key for signing JSON Web Tokens. You can generate a random string for this.

### File Upload

-   `MAX_FILE_SIZE`: The maximum file size for audio uploads, in bytes. The default is `10485760` (10MB).

## Initial Setup

1.  **Install dependencies:**

    This command will install dependencies for the root, frontend, and backend.

    ```bash
    npm run install:all
    ```

2.  **Configure Supabase and environment variables:**

    -   Create a new project on [Supabase](https://supabase.com/).
    -   In your Supabase project, go to the "SQL Editor" and run the SQL queries from `docs/schema.sql` to create the necessary tables.
    -   Fill in your Supabase credentials and other API keys in `backend/.env`.

3.  **Start development servers:**

    This will start both the frontend and backend servers concurrently.

    ```bash
    npm run dev
    ```

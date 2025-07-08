// Shared types for meeting summarizer

export interface Meeting {
  id: string;
  created_at: string;
  user_id?: string;
  title?: string;
  duration?: number;
  file_name?: string;
  file_size?: number;
  status: string;
  full_transcription?: string;
  summary?: string;
  metadata?: any;
  updated_at?: string;
}

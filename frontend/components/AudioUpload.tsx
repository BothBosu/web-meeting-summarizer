import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import type { FileRejection } from 'react-dropzone';

const MAX_SIZE = 100 * 1024 * 1024; // 100MB
const ACCEPTED_TYPES = {
  'audio/mpeg': ['.mp3'],
  'audio/wav': ['.wav'],
  'audio/x-m4a': ['.m4a'],
  'audio/flac': ['.flac'],
};

const AudioUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      const reason = fileRejections[0].errors[0].message;
      setError(reason);
      setFile(null);
      return;
    }
    setFile(acceptedFiles[0]);
    setError(null);
    setTranscription(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_SIZE,
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('audio', file);

    try {
      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setTranscription(data.transcription);
    } catch (error) {
      setError('An error occurred during upload.');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async () => {
    if (!transcription) return;

    try {
      const response = await fetch('http://localhost:3001/api/generate-docx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: transcription }),
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'transcription.docx';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      setError('An error occurred during download.');
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        {...getRootProps()}
        className={`clay-card-blue flex flex-col items-center justify-center p-12 text-center cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 ${isDragActive ? 'border-blue-400 bg-blue-100' : 'border-transparent'}`}
      >
        <input {...getInputProps()} />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M12 12v9" />
        </svg>
        <p className="text-xl font-semibold text-blue-900">
          {isDragActive ? 'Drop the audio file here...' : 'Drag & drop or click to upload'}
        </p>
        <p className="text-sm text-blue-700 mt-2">MP3, WAV, M4A, FLAC • Max 100MB</p>
      </div>

      {error && (
        <div className="mt-4 text-red-600 font-medium text-center">{error}</div>
      )}

      {file && (
        <div className="mt-6 text-center">
          <p className="text-blue-900">
            <span className="font-medium">Selected:</span> {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </p>
          {!uploading && (
            <button
              onClick={handleUpload}
              className="mt-4 px-8 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Upload and Process
            </button>
          )}
        </div>
      )}

      {uploading && (
        <div className="mt-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-blue-900">Uploading and transcribing...</p>
        </div>
      )}

      {transcription && (
        <div className="mt-8 p-6 clay-card bg-white/80 shadow-inner rounded-2xl">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Transcription</h2>
          <p className="text-blue-800 leading-relaxed truncate">{transcription}</p>
          <div className="mt-6 text-right">
            <button
              onClick={handleDownload}
              className="inline-flex items-center px-6 py-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download as DOCX
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioUpload;
 
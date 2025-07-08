import React from 'react';
import './index.css';
import './styles/claymorphism.css';
import AudioUpload from '../components/AudioUpload';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white font-sans">
      <header className="clay-header">
        Meeting Summarizer
      </header>
      <main className="flex flex-col items-center justify-center px-4">
        <section className="clay-hero w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-4 text-blue-900">Summarize Your Meetings Effortlessly</h1>
          <p className="text-lg text-blue-800 mb-6 text-center max-w-xl">
            Upload your meeting audio, get a full transcription and a smart summary with key points, action items, and more. Powered by AI, styled with blue claymorphism.
          </p>
          <AudioUpload />
        </section>
      </main>
    </div>
  );
}

export default App; 

